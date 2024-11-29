from flask import Flask, request, jsonify
from pyswip import Prolog
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Habilita o CORS para todas as rotas

app = Flask(__name__)
prolog = Prolog()

# Carregue o arquivo do Prolog que define os sintomas e diagnósticos
prolog.consult("diagnostico.pl")

@app.route("/diagnosticar", methods=["POST"])
def diagnosticar():
    try:
        dados = request.json
        sintomas = dados.get("sintomas", [])
        
        # Transformar os sintomas em formato para consulta Prolog
        sintomas_prolog = "[" + ", ".join([f"'{sintoma}'" for sintoma in sintomas]) + "]"
        
        consulta = f"adicionar_sintomas({sintomas_prolog}), findall(D, diagnostico(D), Diagnosticos), Diagnosticos."
        
        print("Consulta ao Prolog:", consulta)
        
        resultados = list(prolog.query(consulta))
        
        if resultados:
            # Caso existam diagnósticos encontrados
            diagnosticos = resultados[0]["Diagnosticos"]
            return jsonify({"diagnostico": diagnosticos})
        else:
            return jsonify({"diagnostico": "Nenhum diagnóstico encontrado."})
    except Exception as e:
        print("Erro:", e)
        return jsonify({"erro": "Erro no servidor."}), 500

if __name__ == "__main__":
    app.run(debug=True)
