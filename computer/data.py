import struct

HEAD = b"\x14"

#All data types we expect to recieve
IMU_BYTE   = b"\x00"
GPS_BYTE   = b"\x01"
BARO_BYTE  = b"\x02"

#Bytes of each data_type
IMU_PAYLOAD = 36 # 9 float 32 
GPS_PAYLOAD = 0 # Not defined yet
BARO_PAYLOAD = 12 # 3 float32

# Factores de escala para reconstruir las unidades reales(para mas realismo) AI GENERATED WE NEED TO CHECK IT OURSELVES
IMU_ACCEL_SCALE = 1 / 100.0   # LSB m/s²  (ajustar según config MPU9250)
IMU_GYRO_SCALE  = 1 / 100.0   # LSB °/s
IMU_MAG_SCALE   = 1 / 10.0    # LSB → µT

def get_type(byte:bytes)->DataType:
    if byte == IMU_BYTE:
        return IMU()
    elif byte == GPS_BYTE:
        return GPS()
    elif byte == BARO_BYTE:
        return Barometer()
    else:
        return NullType()

class DataType:
    """Handles data types and their corresponding payload sizes."""
    def __init__(self, type_byte:bytes, payload_size:int, name:str):
        self.type_byte = type_byte
        self.payload_size = payload_size
        self.name = name
    
    @staticmethod
    def read_data()-> None: 
        raise NotImplementedError("Data type has not implemented a read_data method.")

    def __str__(self)->str:
        return f"Type: {self.name} | Byte: {self.type_byte.hex()} | Payload: {self.payload_size} bytes"
    
    def __len__(self)->int:
        return self.payload_size

class NullType(DataType):
    def __init__(self):
        super().__init__(None, None, "Null")
    
    def read_data(self, data)-> dict: 
        return {}

class IMU(DataType):
    """Inertial Measurement Unit (IMU) data type."""
    def __init__(self):
        super().__init__(IMU_BYTE, IMU_PAYLOAD, "IMU")
    
    def read_data(self, data)-> dict[str,float]:
        acc_x, acc_y, acc_z, mag_x, mag_y, mag_z, gyro_x, gyro_y, gyro_z = struct.unpack(">9f",data)
        return {
            "acc_x": acc_x,
            "acc_y": acc_y,
            "acc_z": acc_z,
            "mag_x": mag_x,
            "mag_y": mag_y,
            "mag_z": mag_z,
            "gyro_x": gyro_x,
            "gyro_y": gyro_y,
            "gyro_z": gyro_z,
        }

class GPS(DataType):
    """Global Positioning System (GPS) data type."""
    def __init__(self):
        super().__init__(GPS_BYTE, GPS_PAYLOAD, "GPS")
    
    def read_data(self)-> None:
        # Implement GPS-specific data parsing logic here
        pass

class Barometer(DataType):
    """Barometer data type."""
    def __init__(self):
        super().__init__(BARO_BYTE, BARO_PAYLOAD, "Barometer")
    
    def read_data(self, data:bytes) -> dict[str,float]:
        presion, temp, altitud = struct.unpack('>3f', data)
        #presion (Pa)
        #temperature (Celsius)
        #altitude (meters) (calculated with 1013,25 hPa sea level reference)
        return {
            "pressure":   presion,
            "temperature":   temp   ,
            "altitude":    altitud,
        }

class Packet:
    """Handles packet data using the PHUC Protocol.

    [HEADER 1B][TYPE 1B][TIMESTAMP 4B][DATA 0-128B]
    
    [HEADER]: A single byte that characterizes the conexion.
    [TYPE]: A single byte that characterizes the type of packet.
    [TIMESTAMP]: A 4-byte timestamp to uniquely identify the time the data was captured.
    [DATA]: A variable-length field (0 to 128 bytes) that contains the actual data being transmitted.
    
    Attributes
    ----------
    head : bytes
        The header byte of the packet.
    type : bytes
        The type byte of the packet.
    timestamp : bytes
        The 4-byte timestamp of the packet.
    data : bytes
        The variable-length data field of the packet.
    length : int
        The total length of the packet (head + type + timestamp + data).
    data_length : int
        The length of the data field in bytes.

    Methods
    -------
    json() -> dict
        Returns a JSON-serializable dictionary representation of the packet.
    
    """
    def __init__(self, head:bytes, type:bytes, timestamp:bytes, data:bytes):
        self.head = head
        self.type_byte = type
        self.timestamp = timestamp
        self.data_bytes = data
        self.length = len(head) + len(type) + len(timestamp) + len(data)
        self.data_length = len(data)

        self.data_type = get_type(type)

    def get_data(self) -> dict[str,float]:
        """Returns the data of the packet in a dictionary."""
        return self.data_type.read_data(self.data_bytes)
        
    def __str__(self)->str:
        return f"""
        Packet object with:
        Header: {self.head.hex(" ")}
        Type: {self.data_type.name}
        Timestamp: {self.timestamp.hex(" ")}
        Data: {self.data_bytes.hex(" ")}
        Length: {self.length}
        """
    
    def json(self)->dict:
        return {
            "head": self.head.hex(),
            "type": self.type_byte.hex(),
            "timestamp": self.timestamp.hex(),
            "data": self.data_bytes.hex(),
            "length": self.length,
            "data_length": self.data_length
        }

    def __len__(self)->int:
        return self.length  # head + type + timestamp + data