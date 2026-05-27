// telemetry_plugin.js
// Lo genere con ayuda de IA, a partir de la documentación oficial de OpenMCT.

function UrsaCruxPlugin(wsUrl, dictionaryUrl) {
    return function install(openmct) {

        // ── 1. CARGAR DICTIONARY ─────────────────────────────────
        const dictionaryPromise = fetch(dictionaryUrl)
            .then(r => r.json());

        // ── 2. REGISTRAR ROOT ────────────────────────────────────
        openmct.objects.addRoot({
            namespace: "ursacrux",
            key: "root"
        });

        // ── 3. OBJECT PROVIDER ───────────────────────────────────
        openmct.objects.addProvider("ursacrux", {
            get(identifier) {
                return dictionaryPromise.then(dictionary => {

                    if (identifier.key === "root") {
                        return {
                            identifier,
                            name: dictionary.name,
                            type: "folder",
                            location: "ROOT"
                        };
                    }

                    const measurement = dictionary.measurements
                        .find(m => m.key === identifier.key);

                    if (!measurement) {
                        throw new Error(`Measurement no encontrado: ${identifier.key}`);
                    }

                    return {
                        identifier,
                        name: measurement.name,
                        type: "telemetry",
                        telemetry: { values: measurement.values },
                        location: "ursacrux:root"
                    };
                });
            }
        });

        // ── 4. COMPOSITION PROVIDER ──────────────────────────────
        openmct.composition.addProvider({
            appliesTo(domainObject) {
                return domainObject.identifier.namespace === "ursacrux"
                    && domainObject.type === "folder";
            },
            load() {
                return dictionaryPromise.then(dictionary =>
                    dictionary.measurements.map(m => ({
                        namespace: "ursacrux",
                        key: m.key
                    }))
                );
            }
        });

        // ── 5. WEBSOCKET REALTIME ────────────────────────────────
        const listeners = {};
        const ws = new WebSocket(wsUrl);

        ws.onopen  = () => console.log("✅ WebSocket conectado");
        ws.onerror = (e) => console.error("❌ Error WebSocket:", e);
        ws.onclose = () => console.log("⚠️ WebSocket cerrado");

        ws.onmessage = (event) => {
            try {
                const dato = JSON.parse(event.data);
                if (listeners[dato.id]) {
                    listeners[dato.id].forEach(cb => cb({
                        value: dato.value,
                        utc: dato.timestamp
                    }));
                }
            } catch (e) {
                console.error("Error procesando mensaje WebSocket:", e);
            }
        };

        // ── 6. REALTIME PROVIDER ─────────────────────────────────
        openmct.telemetry.addProvider({
            supportsSubscribe(domainObject) {
                return domainObject.type === "telemetry";
            },
            subscribe(domainObject, callback) {
                const key = domainObject.identifier.key;
                if (!listeners[key]) listeners[key] = [];
                listeners[key].push(callback);
                return function unsubscribe() {
                    listeners[key] = listeners[key].filter(cb => cb !== callback);
                };
            }
        });

        // ── 7. HISTORY PROVIDER ──────────────────────────────────
        openmct.telemetry.addProvider({
            supportsRequest(domainObject, options) {
                return domainObject.identifier.namespace === "ursacrux"
                    && domainObject.identifier.key !== "root"
                    && options.strategy !== "latest";
            },
            request(domainObject, options = {}) {
                const key   = domainObject.identifier.key;
                const start = options.start ?? 0;
                const end   = options.end ?? Date.now();
                console.log("📡 Pidiendo historial:", key);
                const url = `http://localhost:8766/history/${key}?start=${start}&end=${end}`;
                return fetch(url)
                    .then(r => r.json())
                    .then(data => {
                        console.log("✅ Historial recibido:", data.length, "puntos");
                        return data.map(d => ({
                            value: d.value,
                            utc:   d.timestamp
                        }));
                    })
                    .catch(e => {
                        console.error("❌ Error historial:", e);
                        return [];
                    });
            }
        });

    };
}