#  Importar las herramientas
# Acceder a las herramientas para crear la app web
from flask import Flask, request, jsonify

# Para manipular la DB
from flask_sqlalchemy import SQLAlchemy 

# Módulo cors es para que me permita acceder desde el frontend al backend
from flask_cors import CORS

# Crear la app
app = Flask(__name__)

# permita acceder desde el frontend al backend
CORS(app)


# Configurar a la app la DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost:3306/destino_de_la_base_de_datos'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:1234@localhost:3306/ikimasu_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)


# Definir la tabla 
class Viaje(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destino = db.Column(db.String(50))
    origen = db.Column(db.String(50))
    costo = db.Column(db.Integer)
    dias = db.Column(db.Integer)
    # imagen = db.Column(db.String(400))

    def __init__(self,destino,origen,costo,dias):   #crea el  constructor de la clase
        self.destino = destino   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.origen = origen
        self.costo = costo
        self.dias = dias
        # self.imagen = imagen

# Crear la tabla al ejecutarse la app
with app.app_context():
    db.create_all()

# Crear ruta de acceso
# / es la ruta de inicio
@app.route("/")
def index():
    return f'App Web para registrar destinos'

# Crear un registro en la tabla Persona
@app.route("/registro", methods=['POST']) 
def registro():
    # {"destino": "Salta", ...} -> input tiene el atributo name="destino"
    destino_recibido = request.json["destino"]
    origen_recibido = request.json["origen"]
    costo = request.json["costo"]
    dias = request.json["dias"]
    # imagen = request.json['imagen']
    nuevo_registro = Viaje(destino = destino_recibido, origen = origen_recibido, costo = costo, dias = dias)
    db.session.add(nuevo_registro)
    db.session.commit()

    return "Solicitud de post recibida"
    

# Retornar todos los registros en un Json
@app.route("/viajes",  methods=['GET'])
def viajes():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = Viaje.query.all()

    # Lista de diccionarios
    data_serializada = []
    
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "destino":objeto.destino, "origen":objeto.origen, "costo":objeto.costo, "dias":objeto.dias})

    return jsonify(data_serializada)


# Modificar un registro
@app.route('/update/<id>', methods=['PUT'])
def update(id):
    # Buscar el registro a modificar en la tabla por su id
    viaje = Viaje.query.get(id)

    # {"destino": "Felipe"} -> input tiene el atributo name="destino"
    destino = request.json["destino"]
    origen = request.json["origen"]
    costo = request.json['costo']
    dias = request.json['dias']
    # imagen = request.json['imagen']

    viaje.destino = destino
    viaje.origen = origen
    viaje.costo = costo
    viaje.dias = dias
    # Viaje.imagen = imagen
    db.session.commit()

    data_serializada = [{"id":viaje.id, "destino":viaje.destino, "origen":viaje.origen, "costo":viaje.costo, "dias":viaje.dias}]
    
    return jsonify(data_serializada)

   
@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    print(id)
    # Se busca a la persona por id en la DB
    viaje = Viaje.query.get(id)

    # Se elimina de la DB
    db.session.delete(viaje)
    db.session.commit()

    data_serializada = [{"id":viaje.id, "destino":viaje.destino, "origen":viaje.origen, "costo":viaje.costo, "dias":viaje.dias}]

    return jsonify(data_serializada)


if __name__ == "__main__":
    app.run(debug=True)