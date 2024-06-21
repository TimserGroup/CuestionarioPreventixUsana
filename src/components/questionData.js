export const questions = [
    {
        id: 'privacyConsentQ',
        question: 'HE LEÍDO Y ESTOY DE ACUERDO CON LO ESTABLECIDO EN EL AVISO DE PRIVACIDAD Y AUTORIZACIÓN DE USO DE DATOS PERSONALES DENTRO DE LA PÁGINA DE preventix.global/es/aviso-privacidad/',
        answers: ['Sí acepto', 'No acepto'],
        field: 'privacyConsent',
        type: 'choice',
        nextq: {
            'Sí acepto': 'informedConsentQ',
            'No acepto': 'informedConsentQ'
        }
    },
    {
        id: 'informedConsentQ',
        question: 'HE LEÍDO Y ESTOY DE ACUERDO CON LO ESTABLECIDO EN EL CONSENTIMIENTO INFORMADO SOBRE EL USO DE MI MUESTRA BIOLÓGICA Y RESPUESTAS. TODAS LAS RESPUESTAS SON ANONIMAS Y SON UTILIZADAS CON FINES DE INVESTIGACIÓN. CONTENIDAS EN https://preventix.global/consentimiento/',
        answers: ['Sí acepto', 'No acepto'],
        field: 'informedConsent',
        type: 'choice',
        nextq: {
            'Sí acepto': 'fastingHoursQ',
            'No acepto': 'fastingHoursQ'
        }
    },
    {
        id: 'fastingHoursQ',
        question: 'Cumple mínimo con 6 horas de ayuno',
        answers: ['No', 'Sí'],
        field: 'fastingHours',
        type: 'choice',
        nextq: {
            'Sí': 'lastMealTimeQ',
            'No': 'showFastingError'
        }
    },
    {
        id: 'lastMealTimeQ',
        question: '¿A qué hora fue tu último alimento?',
        answers: ['6 Horas', '7 a 8 Horas', 'Más de 8 Horas'],
        field: 'lastMealTime',
        type: 'choice',
        nextq: 'lastMealTypeQ'
    },
    {
        id: 'lastMealTypeQ',
        question: '¿Qué tipo de alimento consumiste?',
        answers: [],
        field: 'lastMealType',
        type: 'text',
        nextq: 'patientFirstNameQ'
    },
    {
        id: 'patientFirstNameQ',
        question: 'Nombre(s) de la paciente (Sin apellidos)',
        answers: [],
        field: 'patientFirstName',
        type: 'text',
        nextq: 'patientLastNameQ'
    },
    {
        id: 'patientLastNameQ',
        question: 'Apellidos',
        answers: [],
        field: 'patientLastName',
        type: 'text',
        nextq: 'birthDateQ'
    },
    {
        id: 'birthDateQ',
        question: 'Fecha nacimiento',
        answers: [],
        field: 'birthDate',
        type: 'date',
        nextq: 'areaTypeQ'
    },
    {
        id: 'areaTypeQ',
        question: '¿Cómo describirías la zona que habitas?',
        answers: ['Urbana', 'Rural', 'Prefiero no contestar'],
        field: 'areaType',
        type: 'choice',
        nextq: 'educationLevelQ'
    },
    {
        id: 'educationLevelQ',
        question: '¿Cuál es tu último grado de estudios?',
        answers: [
            'Educación básica',
            'Educación media',
            'Educación media superior',
            'Educación superior',
            'Postgrado',
            'No tengo estudios',
            'Prefiero no contestar'
        ],
        field: 'educationLevel',
        type: 'choice',
        nextq: 'emailQ'
    },
    {
        id: 'emailQ',
        question: 'Ingresa tu correo electrónico',
        answers: [],
        field: 'email',
        type: 'text',
        nextq: 'confirmEmailQ'
    },
    {
        id: 'confirmEmailQ',
        question: 'Confirma tu correo electrónico',
        answers: [],
        field: 'confirmEmail',
        type: 'text',
        nextq: 'mobilePhoneQ'
    },
    {
        id: 'mobilePhoneQ',
        question: 'Ingresa tu teléfono móvil (celular)',
        answers: [],
        field: 'mobilePhone',
        type: 'text',
        nextq: 'weightQ'
    },
    {
        id: 'weightQ',
        question: '¿Cuál es tu peso en kilogramos (kg)?',
        label: '¿Cuál es tu peso en kilogramos (kg)?',
        min: 30,
        max: 200,
        value: 65,
        unit: 'kg',
        field: 'weight',
        type: 'slider',
        nextq: 'heightQ'
    },
    {
        id: 'heightQ',
        question: '¿Cuál es tu estatura en metros (m)?',
        label: '¿Cuál es tu estatura en metros (m)?',
        min: 40,
        max: 250,
        value: 150,
        unit: 'cm',
        field: 'height',
        type: 'slider',
        nextq: 'sampleLocation' // Última pregunta'
    },
    {
        id: 'sampleLocation',
        question: 'Lugar de toma de muestra',
        answers: [
            'Corporativo',
        ],
        field: 'sampleLocation',
        type: 'choice',
        nextq: 'docFQ'
    },
    {
        id: 'docFQ',
        question: '¿Tienes un ginecólogo de confianza o uno al que visites regularmente?',
        answers: [
            'Sí',
            'No',
            'No recuerdo'
        ],
        field: 'docF',
        type: 'choice',
        nextq: {
            'Sí': 'docNameQ',
            'No': 'vphVaccinationQ',
            'No recuerdo': 'vphVaccinationQ'
        }
    },
    {
        id: 'docNameQ',
        question: 'Ingresa el nombre de tu médico',
        answers: [],
        field: 'docName',
        type: 'text',
        nextq: 'vphVaccinationQ'
    },
    {
        id: 'vphVaccinationQ',
        question: '¿Fuiste vacunada contra el virus del papiloma humano (VPH)?',
        answers: [
            'Sí, recibí 1 dosis',
            'Sí, recibí 2 dosis',
            'Sí, recibí 3 dosis',
            'Sí, no recuerdo cuántas dosis recibí',
            'No',
            'No recuerdo'
        ],
        field: 'vphVaccination',
        type: 'choice',
        nextq: 'detectedConditionsQ'
    },
    {
        id: 'detectedConditionsQ',
        question: '¿Te han detectado alguna de estas condiciones en estudios de laboratorio?',
        answers: [
            'Cáncer',
            'Diabetes',
            'Hipertensión',
            'Enfermedad Tiroidea',
            'Enfermedad del sistema inmune',
            'Infecciones de transmisión sexual no-virales (Clamidia, gonorrea, sífilis, tricomomiasis o micoplasmosis)',
            'Infecciones de transmisión sexual virales (herpes simple, hepatitis B, molusco contagioso o VIH)',
            'Virus del papiloma humano (VPH)',
            'Nunca me han aplicado ninguna de estas pruebas de detección',
            'No recuerdo',
            'No'
        ],
        field: 'detectedConditions',
        type: 'multipleChoice',
        nextq: 'tobaccoConsumptionQ'
    },
    {
        id: 'tobaccoConsumptionQ',
        question: '¿Has fumado tabaco?',
        answers: [
            'Sí, fumé un tiempo pero ya lo dejé', 
            'Sí, actualmente sigo fumando', 
            'No, nunca he fumado'
        ],
        field: 'tobaccoConsumption',
        type: 'choice',
        nextq: {
            'Sí, fumé un tiempo pero ya lo dejé': 'cigarettesPerWeekBeforeQ',
            'Sí, actualmente sigo fumando': 'cigarettesPerWeekCurrentQ',
            'No, nunca he fumado': 'papanicolaouTestQ'
        }
    },
    {
        id: 'cigarettesPerWeekBeforeQ',
        question: 'En promedio, ¿cuántos cigarrillos de tabaco consumías semanalmente?',
        answers: [
            'De 1-35 cigarrillos por semana (5 diarios)', 
            'De 36-105 cigarrillos por semana (6-15 diarios)', 
            '106 cigarrillos o más por semana (16 o más diarios)'
        ],
        field: 'cigarettesPerWeekBefore',
        type: 'choice',
        nextq: 'papanicolaouTestQ'
    },
    {
        id: 'cigarettesPerWeekCurrentQ',
        question: 'En promedio, ¿cuántos cigarrillos de tabaco consumes semanalmente?',
        answers: [
            'De 1-35 cigarrillos por semana (5 diarios)', 
            'De 36-105 cigarrillos por semana (6-15 diarios)', 
            '106 cigarrillos o más por semana (16 o más diarios)'
        ],
        field: 'cigarettesPerWeekCurrent',
        type: 'choice',
        nextq: 'papanicolaouTestQ'
    },
    {
        id: 'papanicolaouTestQ',
        question: '¿Te has realizado una prueba de Papanicolaou?',
        answers: [
            'Sí, sólo 1 vez', 
            'Sí, 2 veces o más', 
            'No, nunca', 
            'No recuerdo'
        ],
        field: 'papanicolaouTest',
        type: 'choice',
        nextq: { 
            'Sí, sólo 1 vez': 'papanicolaouYearQ', 
            'Sí, 2 veces o más': 'papanicolaouYearQ', 
            'No, nunca': 'colposcopyQ', 
            'No recuerdo': 'colposcopyQ'
            }
    },
    {
        id: 'papanicolaouYearQ',
        question: '¿En qué año te realizaste la prueba de Papanicolaou? (Ingresa solo el año, por ejemplo: 2010)',
        answers: [],
        field: 'papanicolaouYear',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el año en formato numérico.'
        },
        nextq: 'papanicolaouResultQ'
    },
    {
        id: 'papanicolaouResultQ',
        question: '¿Qué resultado obtuviste en tu prueba de Papanicolaou?',
        answers: [
            'Negativo a lesión y/o cáncer (sana)',
            'Negativo a lesión/cáncer con proceso inflamatorio (sana con inflamación)',
            'Negativo a lesión/cáncer con infección',
            'Displasia leve NIC-1 (lesión leve)',
            'Displasia moderada NIC-2 (lesión moderada)',
            'Displasia severa NIC-3 (lesión severa)',
            'Cáncer cervicouterino',
            'No recuerdo',
            'No recibí mi resultado'
        ],
        field: 'papanicolaouResult',
        type: 'choice',
        nextq: 'colposcopyQ'
    },
    {
        id: 'colposcopyQ',
        question: '¿Te has realizado una colposcopia?',
        answers: [
            'Sí, 1 vez', 
            'Sí, 2 o más veces', 
            'No, nunca', 
            'No recuerdo'
        ],
        field: 'colposcopy',
        type: 'choice',
        nextq:{
            'Sí, 1 vez': 'colposcopyYearQ', 
            'Sí, 2 o más veces': 'colposcopyYearQ', 
            'No, nunca': 'hysterectomyQ', 
            'No recuerdo': 'hysterectomyQ'
        }
    },
    {
        id: 'colposcopyYearQ',
        question: '¿En qué año realizaste tu última colposcopia? (Ingresa solo el año, por ejemplo: 2010)',
        answers: [],
        field: 'colposcopyYear',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el año en formato numérico.'
        },
        nextq: 'colposcopyResultQ'
    },
    {
        id: 'colposcopyResultQ',
        question: '¿Qué resultado obtuviste en la colposcopia?',
        answers: [
            'Sin alteraciones',
            'Alteraciones inflamatorias inespecíficas',
            'Virus del papiloma humano (VPH)',
            'Displasia leve (NIC-1)',
            'Displasia moderada (NIC-2)',
            'Displasia grave (NIC-3)',
            'Cáncer',
            'Otros (pólipos, quistes, miomas, adenosis)',
            'No recuerdo'
        ],
        field: 'colposcopyResult',
        type: 'choice',
        nextq: 'hysterectomyQ'
    },
    {
        id: 'hysterectomyQ',
        question: '¿Te han realizado una histerectomía?',
        explanation: 'Una histerectomía es una cirugía para extirpar el útero.',
        answers: ['Sí', 'No'],
        field: 'hysterectomy',
        type: 'choice',
        nextq:{
            'Sí': 'hysterectomyReasonQ',
            'No': 'lastMenstruationDateQ'
        }
    },
    {
        id: 'hysterectomyReasonQ',
        question: '¿Recuerdas la razón por la que te realizaron la histerectomía?',
        answers: [
            'Por razones clínicas distintas al cáncer',
            'Porque tenía cáncer de ovario',
            'Porque tenía cáncer de endometrio',
            'Porque tenía cáncer cervicouterino',
            'Por otras razones',
            'No recuerdo'
        ],
        field: 'hysterectomyReason',
        type: 'choice',
        nextq: 'lastMenstruationDateQ'
    },
    {
        id: 'lastMenstruationDateQ',
        question: 'Fecha de la última menstruación',
        answers: [
            'Recientemente', 
            'Ya no la tengo (menopausia)', 
            'Prefiero no contestar'
        ],
        field: 'lastMenstruationDate',
        type: 'choice',
        nextq: 'firstMenstruationAgeQ'
    },
    {
        id: 'firstMenstruationAgeQ',
        question: '¿A qué edad en años, tuviste tu primera menstruación? (Ingresa solo el año, por ejemplo: 12)',
        answers: [],
        field: 'firstMenstruationAge',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el año en formato numérico.'
        },
        nextq: 'sexualRelationsQ'
    },
    {
        id: 'sexualRelationsQ',
        question: '¿Has tenido relaciones sexuales?',
        answers: [
            'Sí', 'No', 'Prefiero no contestar'
        ],
        field: 'sexualRelations',
        type: 'choice',
        nextq: 'firstSexualRelationAgeQ',
        nextq:{
            'Sí': 'firstSexualRelationAgeQ',
            'No': 'close',
            'Prefiero no contestar': 'close'
        }
    },
    {
        id: 'firstSexualRelationAgeQ',
        question: '¿A qué edad en años, tuviste relaciones sexuales por primera vez? (Ingresa solo el año, por ejemplo: 18) ',
        answers: [],
        field: 'firstSexualRelationAge',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el año en formato numérico.'
        },
        nextq: 'sexualPartnersQ'
    },
    {
        id: 'sexualPartnersQ',
        question: '¿Cuántas parejas sexuales has tenido?',
        answers: [
            '1', '2', '3', '4 o más', 'Prefiero no contestar'
        ],
        field: 'sexualPartners',
        type: 'choice',
        nextq: 'currentContraceptiveMethodQ'
    },
    {
        id: 'currentContraceptiveMethodQ',
        question: '¿Qué método anticonceptivo usas actualmente o el último que usaste?',
        answers: [
            'Condón',
            'Anticonceptivos orales',
            'Anticonceptivos inyectables',
            'Parche anticonceptivo',
            'DIU hormonal',
            'DIU de cobre',
            'Píldora del día siguiente',
            'Ligación de trompas de Falopio',
            'Ninguno (nunca he usado métodos anticonceptivos)',
            'Coito interrumpido',
            'No recuerdo',
            'Prefiero no contestar'
        ],
        field: 'currentContraceptiveMethod',
        type: 'choice',
        nextq:{
            'Condón': 'pregnanciesQ',
            'Anticonceptivos orales': 'oralContraceptiveUsageDurationQ',
            'Anticonceptivos inyectables': 'pregnanciesQ',
            'Parche anticonceptivo': 'pregnanciesQ',
            'DIU hormonal': 'pregnanciesQ',
            'DIU de cobre': 'pregnanciesQ',
            'Píldora del día siguiente': 'pregnanciesQ',
            'Ligación de trompas de Falopio': 'pregnanciesQ',
            'Ninguno (nunca he usado métodos anticonceptivos)': 'pregnanciesQ',
            'Coito interrumpido': 'pregnanciesQ',
            'No recuerdo': 'pregnanciesQ',
            'Prefiero no contestar': 'pregnanciesQ'
                
        }
    },
    {
        id: 'oralContraceptiveUsageDurationQ',
        question: 'En caso de haber seleccionado anticonceptivos orales, ¿por cuánto tiempo los has usado?',
        answers: [
            'Menos de 1 año',
            '1 año o más, pero menos de 2 años',
            '2 años o más, pero menos de 3 años',
            '3 años o más, pero menos de 4 años',
            '4 años o más, pero menos de 5 años',
            '5 años o más',
            'No recuerdo'
        ],
        field: 'oralContraceptiveUsageDuration',
        type: 'choice',
        nextq: 'pregnanciesQ'
    },
    {
        id: 'pregnanciesQ',
        question: '¿Te has embarazado?',
        answers: ['Sí', 'No'],
        field: 'pregnancies',
        type: 'choice',
        nextq:{
            'Sí': 'naturalBirthsQ',
            'No': 'close'
        }
    },
    {
        id: 'naturalBirthsQ',
        question: '¿Cuántos partos has tenido?',
        answers: [],
        field: 'naturalBirths',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el numéro de partos en formato numérico.'
        },
        nextq: 'cesareansQ'
    },
    {
        id: 'cesareansQ',
        question: '¿Cuántas cesáreas has tenido?',
        answers: [],
        field: 'cesareans',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el numéro de cesáreas en formato numérico.'
        },
        nextq: 'abortionsQ'
    },
    {
        id: 'abortionsQ',
        question: '¿Has tenido abortos?',
        answers: ['Sí', 'No'],
        field: 'abortions',
        type: 'choice',
        
        nextq: {
            'Sí': 'abortionCountQ',
            'No': 'close'
        }
    },
    {
        id: 'abortionCountQ',
        question: '¿Cuántos abortos has tenido?',
        answers: [],
        field: 'abortionCount',
        type: 'text',
        validation: {
            type: 'numeric',
            errorMessage: 'Por favor, ingresa solo el numéro de abortos en formato numérico.'
        },
        nextq: 'close'
    },
    {
        id: 'avoidSend',
        question: 'Enviar',
        answers: ['Sí', 'No'],
        field: 'send',
        type: 'choice',
        nextq: 'close'
    }
];

export const initialState = {
    questions,
    status: 'active',
    index: 0,
    answer: null,
    appointmentId: null  // Para almacenar el ID de la cita una vez creada
};

export function reducer(state, action) {
    switch (action.type) {
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1
            };
        case 'setAppointmentId':
            return {
                ...state,
                appointmentId: action.payload
            };
        case 'reset':
            return initialState;
        case 'setIndex':
            return {
                ...state,
                index: action.payload
            };
        default:
            return state;
    }
}
