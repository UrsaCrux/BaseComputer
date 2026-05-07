// telemetry_plugin.js
// Lo genere con ayuda de ChatGPT, a partir de la documentación oficial de OpenMCT y de ejemplos de plugins existentes.
//  Luego se pidio en base a necesidades específicas (cargar el dictionary, conectarse al WebSocket, etc).

function UrsaCruxPlugin(wsUrl, dictionaryUrl) {
    return function install(openmct) {

        // ── 1. CARGAR EL DICTIONARY ──────────────────────────────
        const dictionaryPromise = fetch(dictionaryUrl)
            .then(r => r.json());

        // ── 2. REGISTRAR LOS OBJETOS EN EL ÁRBOL DE OPENMCT ─────
        openmct.objects.addRoot({
            namespace: "ursacrux",
            key: "root"
        });

        openmct.objects.addProvider("ursacrux", {
            get(identifier) {
                return dictionaryPromise.then(dictionary => {

                    // nodo raíz → carpeta que contiene todo
                    if (identifier.key === "root") {
                        return {
                            identifier,
                            name: dictionary.name,
                            type: "folder",
                            location: "ROOT"
                        };
                    }

                    // buscar la variable por key
                    const measurement = dictionary.measurements
                        .find(m => m.key === identifier.key);

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

        // ── 3. COMPOSICIÓN: qué hay dentro de la carpeta raíz ───
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

        // ── 4. WEBSOCKET + RUTEO DE DATOS ────────────────────────
        const listeners = {};  // { "imu.accel_x": [callback, ...], ... }

        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const dato = JSON.parse(event.data);
            // dato = { id: "imu.accel_x", timestamp: 1714000000000, value: 0.12 }

            if (listeners[dato.id]) {
                listeners[dato.id].forEach(cb => cb({
                    value: dato.value,
                    utc: dato.timestamp
                }));
            }
        };

        ws.onopen  = () => console.log("WebSocket conectado");
        ws.onerror = (e) => console.error("WebSocket error", e);

        // ── 5. SUSCRIPCIÓN: openmct llama esto cuando abre un gráfico
        openmct.telemetry.addProvider({
            supportsSubscribe(domainObject) {
                return domainObject.type === "telemetry";
            },
            subscribe(domainObject, callback) {
                const key = domainObject.identifier.key;

                if (!listeners[key]) listeners[key] = [];
                listeners[key].push(callback);

                // retorna función para cancelar suscripción
                return function unsubscribe() {
                    listeners[key] = listeners[key].filter(cb => cb !== callback);
                };
            }
        });
    };
}