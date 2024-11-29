% Definindo os sintomas
sintoma(febre).
sintoma(tosse).
sintoma(dor_de_garganta).
sintoma(fadiga).
sintoma(falta_de_ar).
sintoma(dor_no_peito).
sintoma(nausea).
sintoma(vomito).
sintoma(dor_abdominal).
sintoma(dor_no_estomago).
sintoma(pressao_no_rosto).
sintoma(coriza).
sintoma(espirros).
sintoma(perda_de_peso_inexplicavel).
sintoma(dores_no_corpo).
sintoma(producao_de_muco).
sintoma(dificuldade_engolir).
sintoma(necessidade_frequente_urinar).
sintoma(chiado_ao_respirar).
sintoma(inchaco_amigdalas).
sintoma(falta_de_apetite).
sintoma(sensibilidade_luz_som).
sintoma(dor_ao_urinar).
sintoma(diarreia).
sintoma(perda_paladar_olfato).

% Diagnóstico para diferentes condições
diagnostico(gripe) :-
    sintoma(febre),
    sintoma(dores_no_corpo),
    sintoma(tosse),
    sintoma(dor_de_garganta),
    sintoma(fadiga).

diagnostico(resfriado_comum) :-
    sintoma(coriza),
    sintoma(espirros),
    sintoma(tosse),
    sintoma(dor_de_garganta).

diagnostico(covid_19) :-
    sintoma(febre),
    sintoma(tosse),
    sintoma(falta_de_ar),
    sintoma(perda_paladar_olfato),
    sintoma(fadiga).

diagnostico(pneumonia) :-
    sintoma(febre),
    sintoma(tosse),
    sintoma(dor_no_peito),
    sintoma(falta_de_ar),
    sintoma(producao_de_muco).

diagnostico(bronquite) :-
    sintoma(tosse),
    sintoma(producao_de_muco),
    sintoma(fadiga),
    sintoma(falta_de_ar).

diagnostico(gastrite) :-
    sintoma(dor_no_estomago),
    sintoma(nausea),
    sintoma(perda_de_peso_inexplicavel),
    sintoma(falta_de_apetite).

diagnostico(gastroenterite) :-
    sintoma(diarreia),
    sintoma(vomito),
    sintoma(febre),
    sintoma(dor_abdominal).

diagnostico(hipertensao_arterial) :-
    sintoma(dor_de_cabeca),
    sintoma(tontura),
    sintoma(visao_embacada).

diagnostico(diabetes_tipo_2) :-
    sintoma(fadiga),
    sintoma(aumento_da_sede),
    sintoma(aumento_da_miccao),
    sintoma(perda_de_peso_inexplicavel).

diagnostico(apendicite) :-
    sintoma(dor_abdominal),
    sintoma(febre),
    sintoma(nausea),
    sintoma(perda_de_apetite).

diagnostico(sinusite) :-
    sintoma(pressao_no_rosto),
    sintoma(coriza),
    sintoma(dor_de_cabeca),
    sintoma(tosse).

diagnostico(amigdalite) :-
    sintoma(dor_de_garganta),
    sintoma(febre),
    sintoma(dificuldade_engolir),
    sintoma(inchaco_amigdalas).

diagnostico(asma) :-
    sintoma(falta_de_ar),
    sintoma(chiado_ao_respirar),
    sintoma(dor_no_peito),
    sintoma(tosse).

diagnostico(enxaqueca) :-
    sintoma(dor_de_cabeca),
    sintoma(nausea),
    sintoma(sensibilidade_luz_som).

diagnostico(infeccao_urinaria) :-
    sintoma(dor_ao_urinar),
    sintoma(necessidade_frequente_urinar),
    sintoma(dor_abdominal).

% Se nenhum diagnóstico for encontrado
diagnostico("Diagnóstico não encontrado.").
