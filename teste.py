import requests

def obter_sintomas():
    sintomas = []
    print("Responda 's' para sim e 'n' para não, conforme os sintomas apresentados.")

    sintomas_lista = [
        "febre", "tosse", "dor_de_garganta", "fadiga", "dor_de_cabeca",
        "falta_de_ar", "dor_no_peito", "nausea", "vomito",
        "dor_abdominal", "dor_no_estomago", "pressao_no_rosto",
        "coriza", "espirros", "perda_de_peso_inexplicavel", "dores_no_corpo",
        "producao_de_muco", "dificuldade_engolir", "necessidade_frequente_urinar",
        "chiado_ao_respirar", "inchaco_amigdalas", "falta_de_apetite",
        "sensibilidade_luz_som", "dor_ao_urinar", "diarreia", "perda_paladar_olfato",
        "visao_embacada", "tontura", "enxaqueca"
    ]

    for sintoma in sintomas_lista:
        resposta = input(f"O paciente tem {sintoma.replace('_', ' ')}? (s/n): ").strip().lower()
        if resposta == 's':
            sintomas.append(sintoma)
        elif resposta != 'n':
            print("Resposta inválida. Por favor, responda apenas com 's' ou 'n'.")
    
    return sintomas

def diagnosticar_como_usuario(sintomas):
    url = "http://127.0.0.1:5000/diagnosticar"
    try:
        response = requests.post(url, json={"sintomas": sintomas})
        if response.status_code == 200:
            diagnostico = response.json().get("diagnostico")
            if diagnostico:
                print(f"O diagnóstico é: {diagnostico}")
            else:
                print("Nenhum diagnóstico foi identificado.")
        else:
            print(f"Erro ao consultar a API. Código de status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Erro de conexão com a API: {e}")

def main():
    print("Bem-vindo ao sistema de diagnóstico!")
    sintomas = obter_sintomas()
    if sintomas:
        diagnosticar_como_usuario(sintomas)
    else:
        print("Nenhum sintoma foi inserido. Impossível fazer o diagnóstico.")

if __name__ == "__main__":
    main()
