 // ==================== NEXUS DNA INTEGRATION (opcional) ====================
    // Si integras en tu plataforma Django, reemplaza estas constantes por las URLs reales.
    var NEXUS_URL_ENVIAR = window.NEXUS_URL_ENVIAR || '';
    var NEXUS_URL_GUARDAR_INFORME = window.NEXUS_URL_GUARDAR_INFORME || '';
    var NEXUS_URL_LISTA  = window.NEXUS_URL_LISTA || '';
    var AI_ENDPOINT = window.AI_ENDPOINT || '/api/ai/generate';

    function getCsrfToken(){ var m=document.cookie.match(/csrftoken=([^;]+)/); return m?m[1]:''; }

    // ==================== DIMENSIONES ====================
    const DIM_ORDER = ['IM01','IM02','IM03','IM04','IM05','IM06','IM07','IM08','IM09'];
    const DIM_LABELS = { IM01:'Reformador', IM02:'Protector', IM03:'Constructor', IM04:'Individualista', IM05:'Investigador', IM06:'Precavido', IM07:'Explorador', IM08:'Desafiador', IM09:'Pacificador' };
    const DIM_META = {
      IM01:{ color:'#10B981', icon:'🌿', sub:'Mejora y corrección', fear:'Cometer errores', busca:['Mejora','Orden','Calidad','Corrección'], evalua:['Perfeccionismo','Responsabilidad','Autocontrol','Ética'] },
      IM02:{ color:'#EC4899', icon:'❤️', sub:'Ayuda y conexión', fear:'Sentirse rechazado', busca:['Conexión emocional','Cercanía','Ayuda'], evalua:['Empatía','Validación afectiva','Cooperación'] },
      IM03:{ color:'#F59E0B', icon:'🏆', sub:'Logro y validación', fear:'Fracasar', busca:['Éxito','Reconocimiento','Resultados'], evalua:['Ambición','Productividad','Competitividad'] },
      IM04:{ color:'#8B5CF6', icon:'🎭', sub:'Identidad y autenticidad', fear:'Perder identidad', busca:['Identidad','Autenticidad','Expresión personal'], evalua:['Creatividad','Profundidad emocional','Autoconocimiento'] },
      IM05:{ color:'#06B6D4', icon:'🔍', sub:'Conocimiento y análisis', fear:'No comprender', busca:['Comprensión','Conocimiento','Autonomía mental'], evalua:['Análisis','Observación','Pensamiento crítico'] },
      IM06:{ color:'#0EA5E9', icon:'🛡️', sub:'Seguridad y anticipación', fear:'La incertidumbre', busca:['Seguridad','Estabilidad','Anticipación'], evalua:['Planificación','Gestión del riesgo','Previsión'] },
      IM07:{ color:'#3B82F6', icon:'🧭', sub:'Experiencia y libertad', fear:'La rutina', busca:['Libertad','Novedad','Experiencias'], evalua:['Curiosidad','Adaptabilidad','Innovación'] },
      IM08:{ color:'#EF4444', icon:'🦁', sub:'Control y autonomía', fear:'Ser controlado', busca:['Control','Autonomía','Liderazgo'], evalua:['Dominancia','Firmeza','Independencia'] },
      IM09:{ color:'#14B8A6', icon:'🕊️', sub:'Armonía y estabilidad', fear:'El conflicto', busca:['Armonía','Estabilidad','Equilibrio'], evalua:['Conciliación','Adaptación','Cooperación'] }
    };

    // ==================== ARQUETIPOS (= los 9 patrones) ====================
    const ARCHETYPES = {
      IM01:{ name:'Reformador', color:'#10B981', icon:'🌿', chip1:'Perfeccionista', chip2:'Ético', chip3:'Responsable', desc:'Te mueve la mejora, el orden y hacer las cosas bien. Tu estándar interno es alto y persigues la calidad y la corrección.' },
      IM02:{ name:'Protector', color:'#EC4899', icon:'❤️', chip1:'Empático', chip2:'Cercano', chip3:'Cuidador', desc:'Te mueve la conexión emocional y ayudar a los demás. Buscas vínculos cálidos y la validación afectiva del entorno.' },
      IM03:{ name:'Constructor', color:'#F59E0B', icon:'🏆', chip1:'Ambicioso', chip2:'Productivo', chip3:'Competitivo', desc:'Te mueve el logro, los resultados y el reconocimiento. Orientas tu energía a conseguir metas y destacar por tu desempeño.' },
      IM04:{ name:'Individualista', color:'#8B5CF6', icon:'🎭', chip1:'Auténtico', chip2:'Creativo', chip3:'Introspectivo', desc:'Te mueve la autenticidad y la expresión de quién eres. Buscas una identidad propia, profunda y diferenciada.' },
      IM05:{ name:'Investigador', color:'#06B6D4', icon:'🔍', chip1:'Analítico', chip2:'Observador', chip3:'Autónomo', desc:'Te mueve comprender y conocer en profundidad. Necesitas entender cómo funcionan las cosas antes de actuar.' },
      IM06:{ name:'Precavido', color:'#0EA5E9', icon:'🛡️', chip1:'Previsor', chip2:'Planificador', chip3:'Prudente', desc:'Te mueve la seguridad y la estabilidad. Anticipas riesgos, planificas y buscas un terreno firme antes de avanzar.' },
      IM07:{ name:'Explorador', color:'#3B82F6', icon:'🧭', chip1:'Curioso', chip2:'Adaptable', chip3:'Innovador', desc:'Te mueve la libertad, la novedad y las experiencias. Buscas estímulos nuevos y evitas la rutina y lo predecible.' },
      IM08:{ name:'Desafiador', color:'#EF4444', icon:'🦁', chip1:'Dominante', chip2:'Firme', chip3:'Líder', desc:'Te mueve el control, la autonomía y el liderazgo. Asumes el mando con determinación y defiendes tu independencia.' },
      IM09:{ name:'Pacificador', color:'#14B8A6', icon:'🕊️', chip1:'Conciliador', chip2:'Equilibrado', chip3:'Cooperador', desc:'Te mueve la armonía y la estabilidad. Buscas el equilibrio, evitas el conflicto y facilitas el entendimiento.' }
    };

    // ==================== INSIGHTS POR PATRÓN ====================
    const ARCHETYPE_INSIGHTS = {
      IM01:{ strengths:['Altísimo estándar de calidad y rigor','Responsabilidad y compromiso ético','Detecta errores que otros pasan por alto','Fiable en entornos que exigen precisión'], risks:['Autoexigencia y autocrítica excesivas','Dificultad para delegar o "soltar"','Rigidez ante lo imperfecto o lo nuevo'], context_best:'Calidad, auditoría, compliance, procesos, entornos regulados', context_challenge:'Caos creativo, prototipado rápido, ambigüedad constante', dev_areas:['Practicar el "suficientemente bueno" en tareas de bajo impacto','Delegar sin supervisar cada detalle','Tolerar el error como parte del aprendizaje'], estilo:'Trabaja con disciplina y método. Eleva el estándar del equipo, pero necesita aprender a relajar la exigencia.' },
      IM02:{ strengths:['Gran empatía e inteligencia emocional','Construye vínculos de confianza','Cuida el clima y el bienestar del equipo','Detecta necesidades emocionales de los demás'], risks:['Dificultad para poner límites y decir que no','Puede descuidarse a sí mismo por los demás','Sensible al rechazo y a la crítica'], context_best:'RRHH, customer success, coaching, soporte, cuidado de personas', context_challenge:'Decisiones impopulares, entornos muy competitivos o fríos', dev_areas:['Aprender a poner límites sanos','Separar el valor propio de la aprobación externa','Pedir ayuda en lugar de solo darla'], estilo:'Lidera desde la cercanía y el cuidado. Su reto es sostener límites sin sentir que decepciona.' },
      IM03:{ strengths:['Fuerte orientación a resultados y metas','Energía, ambición y productividad','Capacidad para movilizar y conseguir','Adaptable a lo que el éxito requiere'], risks:['Vincular la autoestima al logro y al reconocimiento','Tendencia al exceso de trabajo','Impaciencia con lo lento o lo improductivo'], context_best:'Ventas, desarrollo de negocio, growth, roles orientados a objetivos', context_challenge:'Tareas sin métrica clara, entornos sin reconocimiento', dev_areas:['Conectar con motivaciones internas, no solo externas','Cuidar el descanso y evitar el burnout','Valorar el proceso, no solo el resultado'], estilo:'Ejecuta con energía y foco en el resultado. Su reto es no medir su valor solo por sus logros.' },
      IM04:{ strengths:['Autenticidad y profundidad emocional','Creatividad y mirada original','Fuerte autoconocimiento','Aporta sentido y significado'], risks:['Hipersensibilidad y autorreferencia','Idealizar lo que falta y compararse','Dificultad con lo rutinario o impersonal'], context_best:'Diseño, branding, comunicación creativa, UX, roles con expresión propia', context_challenge:'Procesos muy estandarizados, métricas frías, alta repetición', dev_areas:['Equilibrar emoción con pragmatismo','Evitar la comparación constante','Aportar tu singularidad dentro de la estructura'], estilo:'Aporta identidad y creatividad. Su reto es traducir su profundidad en resultados tangibles y sostenidos.' },
      IM05:{ strengths:['Pensamiento analítico y crítico','Comprende sistemas complejos','Autonomía y objetividad','Aprende con rapidez temas difíciles'], risks:['Sobre-análisis y parálisis','Distancia emocional','Dificultad para actuar sin entenderlo todo'], context_best:'Research, data, UX research, psicología, roles de análisis', context_challenge:'Alta presión emocional, decisiones inmediatas sin datos', dev_areas:['Actuar con el 70% de la información','Conectar el análisis con las personas','Comunicar conclusiones de forma simple'], estilo:'Decide desde la comprensión profunda. Su reto es pasar del análisis a la acción a tiempo.' },
      IM06:{ strengths:['Previsión y gestión del riesgo','Planificación sólida','Fiabilidad y constancia','Anticipa problemas antes de que ocurran'], risks:['Aversión excesiva a la incertidumbre','Tendencia a la preocupación','Puede frenar oportunidades por cautela'], context_best:'Operaciones, PMO, finanzas, gestión de riesgos, planificación', context_challenge:'Entornos volátiles, cambios constantes, apuestas inciertas', dev_areas:['Desarrollar tolerancia al riesgo calculado','Distinguir riesgo real de preocupación','Avanzar con planes "suficientemente seguros"'], estilo:'Aporta solidez y previsión. Su reto es no dejar que la búsqueda de seguridad bloquee el avance.' },
      IM07:{ strengths:['Curiosidad y apertura a lo nuevo','Adaptabilidad y energía positiva','Genera ideas e innovación','Prospera en el cambio'], risks:['Dispersión y dificultad para terminar','Evita la rutina necesaria','Puede comprometerse en exceso'], context_best:'Innovación, producto, consultoría, roles dinámicos y variados', context_challenge:'Tareas repetitivas, procesos rígidos, foco prolongado en lo mismo', dev_areas:['Desarrollar disciplina para cerrar lo iniciado','Priorizar en lugar de abrir todo','Sostener el foco más allá de la novedad'], estilo:'Energiza con ideas y apertura. Su reto es convertir la exploración en ejecución constante.' },
      IM08:{ strengths:['Liderazgo y determinación','Firmeza para decidir y proteger','Autonomía e independencia','Asume el control en la dificultad'], risks:['Tendencia al control y al conflicto','Dificultad para mostrar vulnerabilidad','Puede resultar impositivo'], context_best:'Dirección, CTO, team lead, emprendimiento, roles de mando', context_challenge:'Estructuras donde no controla, normas que percibe injustas', dev_areas:['Liderar también desde la escucha','Permitir la influencia de otros','Mostrar vulnerabilidad sin sentirla como debilidad'], estilo:'Lidera con firmeza y decisión. Su reto es equilibrar el control con la colaboración y la escucha.' },
      IM09:{ strengths:['Conciliación y mediación','Estabilidad emocional','Visión integradora de las posturas','Genera calma y cohesión'], risks:['Evitación del conflicto necesario','Dificultad para priorizarse','Puede postergar decisiones o posicionarse tarde'], context_best:'Mediación, facilitación, RRHH, atención al cliente, roles integradores', context_challenge:'Entornos muy confrontativos, decisiones que exigen tomar partido', dev_areas:['Afrontar el conflicto sano cuando es necesario','Expresar tu postura con claridad','Priorizar tus objetivos, no solo la armonía'], estilo:'Aporta equilibrio y cohesión. Su reto es no diluir su voz por mantener la paz.' }
    };

    // ==================== COMPATIBILIDAD PROFESIONAL ====================
    const COMPAT = {
      IM01:['QA','Compliance','Auditoría','Gestión de Calidad'],
      IM02:['RRHH','Customer Success','Coaching','Soporte / People'],
      IM03:['Ventas','Desarrollo de Negocio','Growth','Desarrollo Comercial'],
      IM04:['Diseño','Branding','UX / Producto creativo','Comunicación'],
      IM05:['UX Research','Data Analyst','Researcher','Psicología'],
      IM06:['Gestión de Riesgos','Operaciones','PMO','Finanzas'],
      IM07:['Innovación','Product','Consultoría','Negocio internacional'],
      IM08:['CTO / Dirección','Team Lead','Emprendimiento','Operaciones de mando'],
      IM09:['Mediación','Facilitación','RRHH','Atención al Cliente']
    };

    const BENCHMARK_GLOBAL = { IM01:60, IM02:62, IM03:58, IM04:55, IM05:57, IM06:59, IM07:56, IM08:54, IM09:61 };

    const QB = {
      IM01: [ // Reformador
        { id:"IM01_a1", dim:"IM01", dim_label:"Reformador", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando trabajas en algo importante:", options:["Intento hacerlo correctamente desde el principio.","Priorizo cómo afecta a las personas.","Busco resultados visibles.","Necesito que refleje quién soy."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_l1", dim:"IM01", dim_label:"Reformador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Me cuesta sentirme satisfecho cuando algo podría hacerse mejor.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_a2", dim:"IM01", dim_label:"Reformador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando detectas un error:", options:["Lo corrijo inmediatamente.","Intento comprender a la persona.","Evalúo el impacto práctico.","Reflexiono sobre lo ocurrido."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_l2", dim:"IM01", dim_label:"Reformador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Tengo estándares muy elevados para mi trabajo.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_a3", dim:"IM01", dim_label:"Reformador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"¿Qué suele darte tranquilidad?", options:["El orden.","Las relaciones.","Los resultados.","La comprensión."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_s1", dim:"IM01", dim_label:"Reformador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Tu equipo entrega un proyecto con varios errores menores.", options:["Solicito corregirlos antes de entregar.","Pregunto cómo afecta al equipo.","Evalúo si afectan al resultado final.","Analizo por qué ocurrieron."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:"Tu equipo entrega un proyecto con varios errores menores.", is_reverse:false, mirror_of:null },
        { id:"IM01_l3", dim:"IM01", dim_label:"Reformador", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Suelo detectar errores que otras personas pasan por alto.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_a4", dim:"IM01", dim_label:"Reformador", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"Cuando recibes una crítica:", options:["Analizo qué debo mejorar.","Pienso en la relación con quien la hizo.","Evalúo si afecta a mis resultados.","Reflexiono sobre su significado."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_l4", dim:"IM01", dim_label:"Reformador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"La calidad es más importante que la velocidad.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_s2", dim:"IM01", dim_label:"Reformador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Te asignan un proceso que funciona pero es mejorable.", options:["Lo rediseño para que quede impecable.","Consulto al equipo antes de tocarlo.","Lo cambio solo si mejora el resultado.","Estudio a fondo cómo funciona primero."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:"Te asignan un proceso que funciona pero es mejorable.", is_reverse:false, mirror_of:null },
        { id:"IM01_a5", dim:"IM01", dim_label:"Reformador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Ante una tarea repetitiva y poco estimulante:", options:["La hago con la máxima precisión posible.","La aprovecho para apoyar al equipo.","Busco terminarla rápido para avanzar.","Busco una forma más libre de hacerla."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM01_me", dim:"IM01", dim_label:"Reformador", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Puedo aceptar fácilmente errores e imperfecciones sin que me afecten demasiado.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM01_l1", is_mirror_item:true }
      ],
      IM02: [ // Protector
        { id:"IM02_a1", dim:"IM02", dim_label:"Protector", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando alguien cercano tiene problemas:", options:["Intento solucionarlo.","Ofrezco apoyo emocional.","Busco soluciones rápidas.","Escucho antes de actuar."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_l1", dim:"IM02", dim_label:"Protector", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Necesito sentir cercanía emocional para sentirme cómodo.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_a2", dim:"IM02", dim_label:"Protector", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"En un equipo normalmente:", options:["Mantengo procedimientos.","Cuido a las personas.","Impulso resultados.","Analizo información."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_l2", dim:"IM02", dim_label:"Protector", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Me afecta emocionalmente cuando las personas importantes para mí están mal.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_a3", dim:"IM02", dim_label:"Protector", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"¿Qué valoras más en una amistad?", options:["Responsabilidad.","Comprensión.","Admiración.","Autenticidad."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_s1", dim:"IM02", dim_label:"Protector", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Un compañero atraviesa una situación complicada.", options:["Le propongo soluciones.","Le ofrezco apoyo emocional.","Le ayudo a resolverlo rápidamente.","Le escucho antes de actuar."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:"Un compañero atraviesa una situación complicada.", is_reverse:false, mirror_of:null },
        { id:"IM02_l3", dim:"IM02", dim_label:"Protector", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Disfruto ayudando a otras personas.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_a4", dim:"IM02", dim_label:"Protector", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"Cuando alguien te pide ayuda:", options:["Evalúo qué debe hacerse.","Me implico emocionalmente.","Busco una solución eficiente.","Intento comprender la situación."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_l4", dim:"IM02", dim_label:"Protector", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Suelo preocuparme por el bienestar de los demás.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_s2", dim:"IM02", dim_label:"Protector", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Hay tensión entre dos personas de tu equipo.", options:["Establezco reglas claras de trabajo.","Me acerco a cada una para acompañarlas.","Me centro en que el trabajo siga avanzando.","Observo qué originó la tensión."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:"Hay tensión entre dos personas de tu equipo.", is_reverse:false, mirror_of:null },
        { id:"IM02_a5", dim:"IM02", dim_label:"Protector", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Cuando logras algo importante, lo primero que sientes es:", options:["Ganas de pulir los detalles.","Deseo de compartirlo con los míos.","Impulso de ir a por el siguiente reto.","Curiosidad por entender cómo lo conseguí."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM02_me", dim:"IM02", dim_label:"Protector", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Prefiero mantener bastante independencia emocional.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM02_l1", is_mirror_item:true }
      ],
      IM03: [ // Constructor
        { id:"IM03_a1", dim:"IM03", dim_label:"Constructor", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué suele motivarte más?", options:["Mejorar procesos.","Ayudar a personas.","Conseguir objetivos ambiciosos.","Expresarme libremente."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_l1", dim:"IM03", dim_label:"Constructor", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Me motiva superar objetivos exigentes.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_a2", dim:"IM03", dim_label:"Constructor", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando alcanzas una meta:", options:["Pienso cómo mejorarla.","La comparto con otros.","Me impulsa a conseguir más.","Reflexiono sobre su significado."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_l2", dim:"IM03", dim_label:"Constructor", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"El reconocimiento profesional es importante para mí.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_a3", dim:"IM03", dim_label:"Constructor", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"Cuando compites:", options:["Intento hacerlo correctamente.","Disfruto compartir la experiencia.","Quiero ganar.","Quiero aprender algo nuevo."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_s1", dim:"IM03", dim_label:"Constructor", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Tu empresa anuncia un reto de alto rendimiento.", options:["Me centro en hacerlo correctamente.","Pienso en cómo afectará al equipo.","Me entusiasma competir.","Evalúo si encaja conmigo."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:"Tu empresa anuncia un reto de alto rendimiento.", is_reverse:false, mirror_of:null },
        { id:"IM03_l3", dim:"IM03", dim_label:"Constructor", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Me gusta destacar por mis resultados.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_a4", dim:"IM03", dim_label:"Constructor", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué te produce mayor satisfacción?", options:["Hacer algo bien.","Ayudar a alguien.","Conseguir resultados.","Ser auténtico."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_l4", dim:"IM03", dim_label:"Constructor", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Me siento cómodo compitiendo.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_s2", dim:"IM03", dim_label:"Constructor", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Puedes asumir un proyecto muy visible pero arriesgado.", options:["Lo acepto si puedo garantizar la calidad.","Pienso en cómo afecta a mi equipo.","Lo acepto: es una oportunidad de destacar.","Valoro si encaja con lo que quiero ser."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:"Puedes asumir un proyecto muy visible pero arriesgado.", is_reverse:false, mirror_of:null },
        { id:"IM03_a5", dim:"IM03", dim_label:"Constructor", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Al final de una jornada, te sientes bien si:", options:["Todo quedó impecable.","Ayudaste a alguien.","Lograste resultados concretos.","Hiciste algo nuevo o distinto."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM03_me", dim:"IM03", dim_label:"Constructor", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"El reconocimiento o el éxito externo me resultan poco relevantes.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM03_l1", is_mirror_item:true }
      ],
      IM04: [ // Individualista
        { id:"IM04_a1", dim:"IM04", dim_label:"Individualista", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando tomas una decisión importante:", options:["Busco hacer lo correcto.","Pienso en las personas implicadas.","Busco el mejor resultado.","Necesito que refleje quién soy."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_l1", dim:"IM04", dim_label:"Individualista", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Necesito sentir que soy auténtico conmigo mismo.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_a2", dim:"IM04", dim_label:"Individualista", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué valoras más?", options:["La calidad.","La conexión.","El éxito.","La autenticidad."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_l2", dim:"IM04", dim_label:"Individualista", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Me resulta importante expresar mi individualidad.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_a3", dim:"IM04", dim_label:"Individualista", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"Cuando alguien no te comprende:", options:["Intento explicarme mejor.","Busco acercarme emocionalmente.","Continúo adelante.","Me afecta profundamente."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_s1", dim:"IM04", dim_label:"Individualista", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Debes elegir entre una opción popular y una que representa tus valores.", options:["Elijo la más correcta.","Pienso en las personas.","Elijo la más eficaz.","Elijo la que refleja mi identidad."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:"Debes elegir entre una opción popular y una que representa tus valores.", is_reverse:false, mirror_of:null },
        { id:"IM04_l3", dim:"IM04", dim_label:"Individualista", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Suelo reflexionar sobre quién soy realmente.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_a4", dim:"IM04", dim_label:"Individualista", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué suele diferenciarte?", options:["Mi disciplina.","Mi empatía.","Mi orientación a resultados.","Mi forma única de ver las cosas."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_l4", dim:"IM04", dim_label:"Individualista", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"La creatividad ocupa un lugar importante en mi vida.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_s2", dim:"IM04", dim_label:"Individualista", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Te piden adaptarte a un estilo de trabajo muy estandarizado.", options:["Lo acepto si garantiza calidad.","Lo acepto para no generar fricción.","Lo acepto si mejora los resultados.","Me cuesta si no me deja ser yo mismo."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:"Te piden adaptarte a un estilo de trabajo muy estandarizado.", is_reverse:false, mirror_of:null },
        { id:"IM04_a5", dim:"IM04", dim_label:"Individualista", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Algo te emociona especialmente cuando:", options:["Está perfectamente hecho.","Conecta con otras personas.","Demuestra un logro.","Expresa algo profundo y personal."], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM04_me", dim:"IM04", dim_label:"Individualista", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Me adapto fácilmente a cualquier situación aunque no refleje quién soy.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM04_l1", is_mirror_item:true }
      ],
      IM05: [ // Investigador
        { id:"IM05_a1", dim:"IM05", dim_label:"Investigador", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Ante una situación nueva:", options:["Busco procedimientos.","Hablo con personas.","Actúo rápidamente.","Intento comprenderla primero."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_l1", dim:"IM05", dim_label:"Investigador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Necesito comprender profundamente las cosas antes de actuar.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_a2", dim:"IM05", dim_label:"Investigador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué suele atraerte más?", options:["La organización.","Las relaciones.","Los desafíos.","El conocimiento."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_l2", dim:"IM05", dim_label:"Investigador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Disfruto aprendiendo temas complejos.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_a3", dim:"IM05", dim_label:"Investigador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"Cuando tienes dudas:", options:["Busco referencias.","Pido opinión.","Tomo una decisión.","Investigo más."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_s1", dim:"IM05", dim_label:"Investigador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Debes resolver un problema complejo.", options:["Aplico procedimientos.","Busco ayuda.","Actúo rápidamente.","Investigo todas las variables."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:"Debes resolver un problema complejo.", is_reverse:false, mirror_of:null },
        { id:"IM05_l3", dim:"IM05", dim_label:"Investigador", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Suelo analizar situaciones desde múltiples perspectivas.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_a4", dim:"IM05", dim_label:"Investigador", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué te genera más confianza?", options:["El orden.","La colaboración.","La experiencia.","Comprender cómo funciona algo."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_l4", dim:"IM05", dim_label:"Investigador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Me siento cómodo trabajando de forma autónoma.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_s2", dim:"IM05", dim_label:"Investigador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Te piden decidir de inmediato sin tiempo para analizar.", options:["Aplico la norma más segura.","Consulto rápido a alguien.","Decido y avanzo.","Pido un momento para entenderlo mejor."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:"Te piden decidir de inmediato sin tiempo para analizar.", is_reverse:false, mirror_of:null },
        { id:"IM05_a5", dim:"IM05", dim_label:"Investigador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Lo que más te incomoda de un proyecto es:", options:["Que esté mal hecho.","Que haya mal ambiente.","Que no avance.","No entender por qué se hace así."], opt_dims:["IM01","IM02","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM05_me", dim:"IM05", dim_label:"Investigador", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Prefiero actuar rápido aunque no tenga toda la información.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM05_l1", is_mirror_item:true }
      ],
      IM06: [ // Precavido
        { id:"IM06_a1", dim:"IM06", dim_label:"Precavido", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Ante una decisión importante:", options:["Reviso normas.","Consulto a personas.","Actúo.","Analizo riesgos."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_l1", dim:"IM06", dim_label:"Precavido", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Prefiero planificar antes de actuar.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_a2", dim:"IM06", dim_label:"Precavido", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué te produce más tranquilidad?", options:["Orden.","Relaciones sólidas.","Control.","Seguridad."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_l2", dim:"IM06", dim_label:"Precavido", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Suelo anticipar posibles problemas.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_a3", dim:"IM06", dim_label:"Precavido", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"Cuando surge incertidumbre:", options:["Busco estructura.","Busco apoyo.","Tomo la iniciativa.","Analizo escenarios."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_s1", dim:"IM06", dim_label:"Precavido", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Te ofrecen una oportunidad atractiva pero incierta.", options:["Analizo los procedimientos.","Pido consejo.","Acepto rápidamente.","Evalúo los riesgos detalladamente."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:"Te ofrecen una oportunidad atractiva pero incierta.", is_reverse:false, mirror_of:null },
        { id:"IM06_l3", dim:"IM06", dim_label:"Precavido", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"La incertidumbre me genera incomodidad.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_a4", dim:"IM06", dim_label:"Precavido", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué valoras más?", options:["Calidad.","Cercanía.","Éxito.","Estabilidad."], opt_dims:["IM01","IM02","IM03","IM06"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_l4", dim:"IM06", dim_label:"Precavido", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Necesito sentir que tengo cierto control sobre los riesgos.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_s2", dim:"IM06", dim_label:"Precavido", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Tu equipo quiere lanzar algo sin plan de contingencia.", options:["Pido que se documente bien antes.","Me aseguro de que todos estén alineados.","Confío en avanzar y resolver sobre la marcha.","Preparo un plan B por si falla."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:"Tu equipo quiere lanzar algo sin plan de contingencia.", is_reverse:false, mirror_of:null },
        { id:"IM06_a5", dim:"IM06", dim_label:"Precavido", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Antes de un cambio importante, sueles:", options:["Revisar que todo cumpla los estándares.","Hablar con los afectados.","Avanzar con decisión.","Prever qué podría salir mal."], opt_dims:["IM01","IM02","IM08","IM06"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM06_me", dim:"IM06", dim_label:"Precavido", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Me siento cómodo en situaciones impredecibles.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM06_l1", is_mirror_item:true }
      ],
      IM07: [ // Explorador
        { id:"IM07_a1", dim:"IM07", dim_label:"Explorador", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando tienes tiempo libre:", options:["Organizo tareas.","Quedo con personas.","Busco retos.","Exploro algo nuevo."], opt_dims:["IM01","IM02","IM08","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_l1", dim:"IM07", dim_label:"Explorador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Me entusiasma descubrir cosas nuevas.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_a2", dim:"IM07", dim_label:"Explorador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué te motiva más?", options:["Mejorar procesos.","Ayudar a personas.","Conseguir resultados.","Vivir experiencias."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_l2", dim:"IM07", dim_label:"Explorador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"La rutina me resulta aburrida.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_a3", dim:"IM07", dim_label:"Explorador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"¿Cómo reaccionas ante el cambio?", options:["Intento organizarlo.","Hablo con otros.","Lo lidero.","Lo veo como una oportunidad."], opt_dims:["IM01","IM02","IM08","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_s1", dim:"IM07", dim_label:"Explorador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Te ofrecen trabajar en un país desconocido.", options:["Analizo el proceso.","Consulto a personas cercanas.","Evalúo beneficios.","Me entusiasma la experiencia."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:"Te ofrecen trabajar en un país desconocido.", is_reverse:false, mirror_of:null },
        { id:"IM07_l3", dim:"IM07", dim_label:"Explorador", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Disfruto explorando posibilidades.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_a4", dim:"IM07", dim_label:"Explorador", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué valoras más?", options:["Estabilidad.","Relaciones.","Logros.","Libertad."], opt_dims:["IM06","IM02","IM03","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_l4", dim:"IM07", dim_label:"Explorador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Me adapto fácilmente a los cambios.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_s2", dim:"IM07", dim_label:"Explorador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Tu rol se vuelve totalmente predecible y repetitivo.", options:["Lo perfecciono al máximo.","Lo llevo bien si el equipo está unido.","Busco objetivos más ambiciosos.","Necesito introducir variedad o cambiar."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:"Tu rol se vuelve totalmente predecible y repetitivo.", is_reverse:false, mirror_of:null },
        { id:"IM07_a5", dim:"IM07", dim_label:"Explorador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Lo que más temes de un trabajo es:", options:["Que se hagan las cosas mal.","Sentirte aislado.","No conseguir resultados.","Que se vuelva monótono."], opt_dims:["IM01","IM02","IM03","IM07"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM07_me", dim:"IM07", dim_label:"Explorador", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Prefiero mantener siempre entornos estables y previsibles.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM07_l1", is_mirror_item:true }
      ],
      IM08: [ // Desafiador
        { id:"IM08_a1", dim:"IM08", dim_label:"Desafiador", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando surge un problema:", options:["Aplico normas.","Busco consenso.","Tomo el control.","Analizo causas."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_l1", dim:"IM08", dim_label:"Desafiador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Prefiero liderar antes que seguir.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_a2", dim:"IM08", dim_label:"Desafiador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué te molesta más?", options:["El desorden.","La falta de empatía.","Que otros decidan por ti.","La ignorancia."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_l2", dim:"IM08", dim_label:"Desafiador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Me gusta asumir responsabilidades importantes.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_a3", dim:"IM08", dim_label:"Desafiador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"En situaciones difíciles:", options:["Mantengo la disciplina.","Apoyo al grupo.","Lidero.","Analizo."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_s1", dim:"IM08", dim_label:"Desafiador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"El equipo está bloqueado.", options:["Organizo tareas.","Escucho al grupo.","Tomo el liderazgo.","Analizo el problema."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:"El equipo está bloqueado.", is_reverse:false, mirror_of:null },
        { id:"IM08_l3", dim:"IM08", dim_label:"Desafiador", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Me siento cómodo tomando decisiones difíciles.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_a4", dim:"IM08", dim_label:"Desafiador", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué valoras más?", options:["Responsabilidad.","Cooperación.","Independencia.","Conocimiento."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_l4", dim:"IM08", dim_label:"Desafiador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Necesito autonomía para rendir bien.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_s2", dim:"IM08", dim_label:"Desafiador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Alguien intenta imponerte cómo hacer tu trabajo.", options:["Acepto si la norma tiene sentido.","Busco un punto de acuerdo.","Defiendo mi autonomía con firmeza.","Cuestiono el porqué de la imposición."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:"Alguien intenta imponerte cómo hacer tu trabajo.", is_reverse:false, mirror_of:null },
        { id:"IM08_a5", dim:"IM08", dim_label:"Desafiador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Cuando algo te parece injusto:", options:["Señalo lo que debería corregirse.","Cuido cómo lo viven los demás.","Lo confronto directamente.","Analizo si realmente lo es."], opt_dims:["IM01","IM02","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM08_me", dim:"IM08", dim_label:"Desafiador", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"Prefiero adaptarme antes que dirigir.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM08_l1", is_mirror_item:true }
      ],
      IM09: [ // Pacificador
        { id:"IM09_a1", dim:"IM09", dim_label:"Pacificador", phase:"Fase 1", phase_name:"Motivación Interna", type:"abcd", versions:["essential","advanced","premium"], text:"Cuando surge un conflicto:", options:["Intento corregirlo.","Intento que todos se entiendan.","Voy directo al problema.","Me retiro a analizar."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_l1", dim:"IM09", dim_label:"Pacificador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["essential","advanced","premium"], text:"Me esfuerzo por mantener la armonía.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_a2", dim:"IM09", dim_label:"Pacificador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["essential","advanced","premium"], text:"¿Qué valoras más?", options:["La calidad.","La armonía.","La eficacia.","La comprensión."], opt_dims:["IM01","IM09","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_l2", dim:"IM09", dim_label:"Pacificador", phase:"Fase 1", phase_name:"Motivación Interna", type:"likert", versions:["advanced","premium"], text:"Evito conflictos innecesarios.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_a3", dim:"IM09", dim_label:"Pacificador", phase:"Fase 2", phase_name:"Relación con el Entorno", type:"abcd", versions:["advanced","premium"], text:"En un equipo:", options:["Mantengo los procesos.","Facilito acuerdos.","Impulso resultados.","Analizo la información."], opt_dims:["IM01","IM09","IM03","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_s1", dim:"IM09", dim_label:"Pacificador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"sit", versions:["advanced","premium"], text:"Dos compañeros discuten intensamente.", options:["Busco normas.","Intento mediar.","Afronto el problema.","Analizo la situación."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:"Dos compañeros discuten intensamente.", is_reverse:false, mirror_of:null },
        { id:"IM09_l3", dim:"IM09", dim_label:"Pacificador", phase:"Fase 3", phase_name:"Estrés y Adaptación", type:"likert", versions:["premium"], text:"Prefiero colaborar antes que competir.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_a4", dim:"IM09", dim_label:"Pacificador", phase:"Fase 4", phase_name:"Relaciones Personales", type:"abcd", versions:["premium"], text:"¿Qué suele darte paz?", options:["El orden.","La estabilidad emocional.","El control.","El conocimiento."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_l4", dim:"IM09", dim_label:"Pacificador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"likert", versions:["premium"], text:"Me adapto fácilmente para mantener buenas relaciones.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_s2", dim:"IM09", dim_label:"Pacificador", phase:"Fase 5", phase_name:"Trabajo y Objetivos", type:"sit", versions:["premium"], text:"Tu opinión es minoritaria pero el grupo ya decidió.", options:["Insisto en que se haga bien.","Cedo para no romper la armonía.","Defiendo mi postura con firmeza.","Expongo mi análisis y dejo decidir."], opt_dims:["IM01","IM09","IM08","IM05"], scenario:"Tu opinión es minoritaria pero el grupo ya decidió.", is_reverse:false, mirror_of:null },
        { id:"IM09_a5", dim:"IM09", dim_label:"Pacificador", phase:"Fase 6", phase_name:"Escenarios Reales", type:"abcd", versions:["premium"], text:"Lo que más te desgasta es:", options:["El desorden y los errores.","Que alguien sufra.","La pasividad y la falta de avance.","La tensión y el conflicto."], opt_dims:["IM01","IM02","IM03","IM09"], scenario:null, is_reverse:false, mirror_of:null },
        { id:"IM09_me", dim:"IM09", dim_label:"Pacificador", phase:"Fase 7", phase_name:"Preguntas Espejo", type:"likert", versions:["premium"], text:"No me importa generar conflictos si consigo mis objetivos.", options:null, opt_dims:null, scenario:null, is_reverse:true, mirror_of:"IM09_l1", is_mirror_item:true }
      ],
      VALIDATION: [
        { id:"AT01", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["essential","advanced","premium"], text:"Para verificar la calidad de tus respuestas, selecciona la opción 2 (Poco parecido a mí).", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:2 },
        { id:"AT02", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["essential","advanced","premium"], text:"Para comprobar tu atención, marca la respuesta número 4 (Bastante parecido a mí).", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:4 },
        { id:"AT03", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"abcd", versions:["advanced","premium"], text:"Control de atención: selecciona la opción C.", options:["Opción A","Opción B","Opción C","Opción D"], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:2 },
        { id:"AT04", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["premium"], text:"Control de atención: selecciona la opción 3 (Variable).", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:3 },
        { id:"AT05", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"abcd", versions:["premium"], text:"Control de atención: selecciona la opción B.", options:["Opción A","Opción B","Opción C","Opción D"], opt_dims:["IM01","IM02","IM03","IM04"], scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:1 },
        { id:"AT06", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["premium"], text:"Control de atención: selecciona la opción 5 (Me representa muchísimo).", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_attention_check:true, expected:5 },
        { id:"AF01", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["essential","advanced","premium"], text:"Nunca he cometido un error importante.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true },
        { id:"AF02", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["advanced","premium"], text:"Siempre tomo la mejor decisión posible.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true },
        { id:"AF03", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["advanced","premium"], text:"Todo el mundo suele estar de acuerdo conmigo.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true },
        { id:"AF04", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["premium"], text:"Nunca me he sentido inseguro.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true },
        { id:"AF05", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["premium"], text:"Jamás he tenido conflictos con otras personas.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true },
        { id:"AF06", dim:"VALIDATION", dim_label:"Validación", phase:"Fase 8", phase_name:"Validación Psicométrica", type:"likert", versions:["premium"], text:"Siempre actúo de forma perfecta.", options:null, opt_dims:null, scenario:null, is_reverse:false, mirror_of:null, is_anti_fake:true }
      ]
    };

    // ==================== BUILD QUESTIONS ====================
    function buildQuestions(version) {
      let all = [];
      const dimOrder = ['IM01','IM02','IM03','IM04','IM05','IM06','IM07','IM08','IM09','VALIDATION'];
      const limits = { essential: 30, advanced: 60, premium: 120 };
      const limit = limits[version];

      Object.entries(QB).forEach(([dimKey, arr]) => {
        arr.forEach(q => {
          if (q.versions && q.versions.includes(version)) all.push({ ...q, dimKey: q.dim });
        });
      });

      const phaseOrder = { 'Fase 1':1,'Fase 2':2,'Fase 3':3,'Fase 4':4,'Fase 5':5,'Fase 6':6,'Fase 7':7,'Fase 8':8 };
      all.sort((a, b) => {
        const pa = phaseOrder[a.phase] || 99, pb = phaseOrder[b.phase] || 99;
        if (pa !== pb) return pa - pb;
        const da = dimOrder.indexOf(a.dim), db = dimOrder.indexOf(b.dim);
        if (da !== db) return da - db;
        return (a.id||'').localeCompare(b.id||'');
      });

      if (all.length > limit) all = all.slice(0, limit);
      return all;
    }

    // ==================== SCORING ====================
    function scoreLikert(ans, isReverse) {
      const v = {1:10,2:28,3:52,4:75,5:100};
      if (isReverse) { const r = 6 - ans; return v[r] ?? 50; }
      return v[ans] ?? 50;
    }

    // Vector: combina elección forzada (ABCD/sit con opt_dims) + Likert por patrón
    function computeVector() {
      const dims = DIM_ORDER;
      const likert = {}, hits = {}, opps = {};
      dims.forEach(d => { likert[d] = []; hits[d] = 0; opps[d] = 0; });

      state.questions.forEach((q, i) => {
        const ans = state.answers[i];
        if (ans === undefined) return;
        if (q.dim === 'VALIDATION') return; // los ítems de validación no puntúan patrón
        if (q.type === 'likert') {
          if (likert[q.dim] !== undefined) likert[q.dim].push(scoreLikert(ans, q.is_reverse));
        } else if ((q.type === 'abcd' || q.type === 'sit') && q.opt_dims) {
          q.opt_dims.forEach(d => { if (opps[d] !== undefined) opps[d]++; });
          const chosen = q.opt_dims[ans];
          if (chosen && hits[chosen] !== undefined) hits[chosen]++;
        }
      });

      const vec = {};
      const clamp = v => Math.max(12, Math.min(100, Math.round(v)));
      dims.forEach(d => {
        const lk = likert[d].length ? likert[d].reduce((a,b)=>a+b,0)/likert[d].length : null;
        const sel = opps[d] > 0 ? (hits[d]/opps[d])*100 : null;
        let val;
        if (lk !== null && sel !== null) val = lk*0.5 + sel*0.5;
        else if (lk !== null) val = lk;
        else if (sel !== null) val = sel;
        else val = 50;
        vec[d] = clamp(val);
      });
      return vec;
    }

    // MII — Motivational Identity Index (claridad/definición del perfil)
    function computeMII(vec) {
      const vals = DIM_ORDER.map(d => vec[d]).sort((a,b)=>b-a);
      const top = vals[0], second = vals[1];
      const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
      return Math.round(top*0.45 + second*0.25 + mean*0.30);
    }

    // Puntuaciones de arquetipo = los 9 patrones (su propio valor de vector)
    function computeArchetypeScores(vec) {
      const out = {};
      DIM_ORDER.forEach(d => { out[d] = vec[d]; });
      return out;
    }

    // 6 Índices de Identidad
    function computeIdentityIndices(vec) {
      return {
        autoexigencia: Math.round((vec.IM01 + vec.IM03) / 2),
        conexion:      Math.round((vec.IM02 + vec.IM09) / 2),
        autonomia:     Math.round((vec.IM08 + vec.IM04) / 2),
        profundidad:   Math.round((vec.IM05 + vec.IM04) / 2),
        apertura:      Math.round((vec.IM07 + vec.IM05) / 2),
        seguridad:     Math.round((vec.IM06 + vec.IM01) / 2)
      };
    }

    // 8 Índices Maestros (integración Nexus DNA)
    function computeMasterIndices(vec) {
      return {
        Liderazgo:     Math.round((vec.IM08 + vec.IM03) / 2),
        Cooperacion:   Math.round((vec.IM02 + vec.IM09) / 2),
        Innovacion:    Math.round((vec.IM07 + vec.IM04) / 2),
        Analisis:      Math.round((vec.IM05 + vec.IM06) / 2),
        Ejecucion:     Math.round((vec.IM03 + vec.IM01) / 2),
        Estabilidad:   Math.round((vec.IM09 + vec.IM06) / 2),
        Autenticidad:  Math.round((vec.IM04 + vec.IM05) / 2),
        Resiliencia:   Math.round((vec.IM08 + vec.IM07) / 2)
      };
    }

    // Centro Motivacional (tríadas del Eneagrama)
    function computeCentro(vec) {
      const instintivo = (vec.IM01 + vec.IM08 + vec.IM09) / 3;
      const emocional  = (vec.IM02 + vec.IM03 + vec.IM04) / 3;
      const mental     = (vec.IM05 + vec.IM06 + vec.IM07) / 3;
      const dominant = Math.max(instintivo, emocional, mental);
      if (dominant === instintivo) return { label:'Centro Instintivo', pct:Math.round(instintivo), color:'#EF4444', icon:'🔥', desc:'Tu energía nace del cuerpo y el instinto. Te relacionas con el mundo desde el control, la acción y la autonomía. Patrones: Reformador, Desafiador y Pacificador.' };
      if (dominant === emocional)  return { label:'Centro Emocional', pct:Math.round(emocional), color:'#EC4899', icon:'❤️', desc:'Tu energía nace de la emoción y la identidad. Te mueves por la conexión, el reconocimiento y la autenticidad. Patrones: Protector, Constructor e Individualista.' };
      return { label:'Centro Mental', pct:Math.round(mental), color:'#06B6D4', icon:'🧠', desc:'Tu energía nace del pensamiento y la anticipación. Procesas el mundo desde el análisis, la seguridad y la exploración. Patrones: Investigador, Precavido y Explorador.' };
    }

    // Tensiones Motivacionales (pares en conflicto)
    function computeTensions(vec) {
      const t = [];
      if (vec.IM03 > 75 && vec.IM09 < 50) t.push({ name:'Sobre-exigencia', severity:'warning', icon:'⚠️', desc:'Tu fuerte orientación al logro con poca búsqueda de armonía puede llevarte a no parar nunca y a medir tu valor solo por tus resultados.' });
      if (vec.IM02 > 75 && vec.IM08 < 50) t.push({ name:'Dificultad con los límites', severity:'warning', icon:'⚠️', desc:'Tu alta necesidad de cuidar y conectar, con baja afirmación personal, puede hacer que te cueste decir que no y poner límites sanos.' });
      if (vec.IM05 > 75 && vec.IM02 < 50) t.push({ name:'Distancia emocional', severity:'caution', icon:'🔶', desc:'Tu profundidad analítica con baja orientación al vínculo puede alejarte emocionalmente de las personas en momentos clave.' });
      if (vec.IM08 > 75 && vec.IM09 < 50) t.push({ name:'Tendencia al control', severity:'caution', icon:'🔶', desc:'Tu fuerte necesidad de control y autonomía con poca búsqueda de armonía puede generar choques y dificultad para ceder.' });
      if (vec.IM06 > 75 && vec.IM07 < 50) t.push({ name:'Aversión al cambio', severity:'caution', icon:'🔶', desc:'Tu alta necesidad de seguridad con baja apertura a lo nuevo puede frenar oportunidades por exceso de cautela.' });
      if (vec.IM07 > 75 && vec.IM01 < 50) t.push({ name:'Dispersión', severity:'info', icon:'ℹ️', desc:'Tu apertura a lo nuevo con baja orientación al orden puede hacer que abras muchos frentes y te cueste cerrarlos.' });
      if (vec.IM04 > 75 && vec.IM03 < 50) t.push({ name:'Idealización vs pragmatismo', severity:'info', icon:'ℹ️', desc:'Tu búsqueda de autenticidad con baja orientación al resultado puede hacer que lo ideal te aleje de lo concreto y realizable.' });
      if (vec.IM01 > 75 && vec.IM07 < 50) t.push({ name:'Rigidez ante lo nuevo', severity:'info', icon:'ℹ️', desc:'Tu alto estándar de orden y corrección con baja apertura puede dificultar que te adaptes a lo imperfecto o lo improvisado.' });
      if (t.length === 0) t.push({ name:'Sin tensiones dominantes', severity:'ok', icon:'✅', desc:'Tu perfil no muestra tensiones motivacionales marcadas. Mantienes un buen equilibrio entre tus distintos patrones.' });
      return t;
    }

    // 6 Escenarios de contexto laboral
    function computeScenarioScores(vec) {
      return [
        { name:'Liderazgo y dirección',     score:Math.round(vec.IM08*0.40 + vec.IM03*0.35 + vec.IM01*0.25), icon:'👑', desc:'Encaje en roles de mando, decisión y responsabilidad' },
        { name:'Trabajo colaborativo',      score:Math.round(vec.IM02*0.40 + vec.IM09*0.35 + vec.IM07*0.25), icon:'🤝', desc:'Aporte en equipos, cooperación y clima' },
        { name:'Innovación y cambio',       score:Math.round(vec.IM07*0.45 + vec.IM04*0.30 + vec.IM05*0.25), icon:'🚀', desc:'Adaptación y aporte en entornos cambiantes' },
        { name:'Entornos estructurados',    score:Math.round(vec.IM06*0.40 + vec.IM01*0.35 + vec.IM09*0.25), icon:'📐', desc:'Rendimiento en procesos, orden y previsión' },
        { name:'Alta presión / crisis',     score:Math.round(vec.IM08*0.40 + vec.IM06*0.30 + vec.IM03*0.30), icon:'🚨', desc:'Respuesta bajo presión y situaciones críticas' },
        { name:'Soporte y cuidado',         score:Math.round(vec.IM02*0.45 + vec.IM09*0.30 + vec.IM01*0.25), icon:'🌿', desc:'Roles de acompañamiento, servicio y atención' }
      ];
    }

    // ==================== VALIDATION ENGINE (IdentityMap) ====================
    function computeValidationEngine(answers, questions, responseTimes) {
      // Consistencia: pares espejo (mirror). consistencyScore = 100 - avgDiff*20  (diff 0-4)
      let diffs = [];
      questions.forEach((q, mirrorIdx) => {
        if (q.mirror_of && q.type === 'likert') {
          const origIdx = questions.findIndex(x => x.id === q.mirror_of);
          if (origIdx !== -1 && answers[origIdx] !== undefined && answers[mirrorIdx] !== undefined) {
            const inv = 6 - answers[mirrorIdx];
            diffs.push(Math.abs(answers[origIdx] - inv));
          }
        }
      });
      const avgDiff = diffs.length ? diffs.reduce((a,b)=>a+b,0)/diffs.length : 0;
      let consistencyScore = diffs.length ? Math.round(100 - avgDiff*20) : 100;
      consistencyScore = Math.max(0, Math.min(100, consistencyScore));

      // Atención
      let att = [];
      questions.forEach((q,i) => { if (q.is_attention_check && answers[i] !== undefined) att.push(answers[i] === q.expected); });
      let attentionScore = att.length ? Math.round((att.filter(Boolean).length/att.length)*100) : 100;

      // Anti-fake (deseabilidad social): penaliza respuestas extremas "perfectas"
      let af = [];
      questions.forEach((q,i) => { if (q.is_anti_fake && answers[i] !== undefined) af.push(answers[i]); });
      let authenticityScore = af.length ? Math.max(0, Math.round(100 - (af.filter(v => v>=4).length/af.length)*50)) : 100;

      // Fiabilidad global
      let reliabilityIndex = Math.round((consistencyScore + attentionScore + authenticityScore)/3);

      // Straightlining (responder siempre lo mismo)
      const vals = Object.values(answers).filter(v => typeof v === 'number');
      if (vals.length > 0) {
        const freq = {}; vals.forEach(v => { freq[v] = (freq[v]||0)+1; });
        const maxF = Math.max(...Object.values(freq));
        const sl = (maxF/vals.length)*100;
        if (sl >= 70) reliabilityIndex = Math.max(0, reliabilityIndex-20);
        else if (sl >= 60) reliabilityIndex = Math.max(0, reliabilityIndex-10);
      }

      let reliabilityColor, reliabilityStatus;
      if (reliabilityIndex >= 85) { reliabilityColor='#22C55E'; reliabilityStatus='Excelente · Resultado fiable'; }
      else if (reliabilityIndex >= 70) { reliabilityColor='#F59E0B'; reliabilityStatus='Aceptable · Interpretar con cautela'; }
      else { reliabilityColor='#EF4444'; reliabilityStatus='Baja · Resultado poco fiable'; }

      return { consistency:consistencyScore, attention:attentionScore, authenticity:authenticityScore, reliability:reliabilityIndex, reliabilityColor, reliabilityStatus };
    }

    // ==================== BENCHMARK ====================
    function computeBenchmarks(vec) {
      const bm = {};
      Object.entries(vec).forEach(([k,score]) => {
        const mean = BENCHMARK_GLOBAL[k] || 58;
        const z = (score - mean)/15;
        const p = Math.max(1, Math.min(99, Math.round(50 + z*34)));
        bm[k] = { score, percentile:p, label:DIM_LABELS[k] };
      });
      return bm;
    }

    // ==================== STATE & NAVIGATION ====================
    let state = { version:'advanced', questions:[], current:0, answers:{}, results:null, questionStartTime:null, responseTimes:{} };

    function goTo(id) { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0,0); }
    function restartApp() { state={version:'advanced',questions:[],current:0,answers:{},results:null,questionStartTime:null,responseTimes:{}}; goTo('landing'); }
    function makeParticles(cid) { const c=document.getElementById(cid);if(!c)return;c.innerHTML='';for(let i=0;i<20;i++){const p=document.createElement('div');p.className='pt';p.style.cssText=`left:${Math.random()*100}%;width:${1+Math.random()*3}px;height:${1+Math.random()*3}px;background:${Math.random()>.5?'rgba(0,212,255,.7)':'rgba(124,58,237,.6)'};animation-duration:${8+Math.random()*15}s;animation-delay:${Math.random()*10}s`;c.appendChild(p);}}

    function populateIntroDims() {
      const el = document.getElementById('introDims');
      if (!el) return;
      el.innerHTML = DIM_ORDER.map(d => {
        const m = DIM_META[d], a = ARCHETYPES[d];
        return `<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#fff;border:1px solid #EEF2F7;border-radius:9px"><span style="font-size:15px">${m.icon}</span><span style="font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;color:${m.color}">${a.name}</span></div>`;
      }).join('');
    }

    function selectVersion(v) {
      state.version = v;
      const vMap = { essential:{q:'30',t:"~10'"}, advanced:{q:'60',t:"~18'"}, premium:{q:'120',t:"~35'"} };
      document.getElementById('iQ').textContent = vMap[v].q;
      document.getElementById('iT').textContent = vMap[v].t;
      document.getElementById('introSub').textContent = `IdentityMap ${v.charAt(0).toUpperCase()+v.slice(1)} · Patrones Motivacionales`;
      document.getElementById('introBadge').textContent = `${v.toUpperCase()} · ${vMap[v].q} PREGUNTAS`;
      populateIntroDims();
      goTo('intro');
    }

    function startAssessment() { state.questions=buildQuestions(state.version); state.current=0; state.answers={}; state.responseTimes={}; goTo('assessment'); renderQ(); }

    function renderQ() {
      state.questionStartTime = performance.now();
      const q = state.questions[state.current];
      const total = state.questions.length;
      const pct = Math.round((state.current/total)*100);
      document.getElementById('qCounter').textContent = `Pregunta ${state.current+1} de ${total}`;
      document.getElementById('qPct').textContent = pct+'%';
      document.getElementById('progFill').style.width = pct+'%';
      // Neutralidad: mostramos la FASE, no el patrón (evita sesgar la respuesta)
      document.getElementById('qDim').textContent = q.phase_name || '';
      document.getElementById('qNumBadge').textContent = String(state.current+1).padStart(2,'0')+'/'+String(total).padStart(2,'0');
      document.getElementById('qText').textContent = q.text;
      document.getElementById('assPhase').textContent = q.phase_name || 'Evaluación';
      if (q.phase) { document.getElementById('phaseNum').textContent = q.phase.replace('Fase ',''); document.getElementById('phaseName').textContent = q.phase_name||''; }
      const sc = document.getElementById('qScenario');
      if (q.scenario) { sc.textContent = q.scenario; sc.classList.add('show'); } else { sc.textContent=''; sc.classList.remove('show'); }
      const container = document.getElementById('optionsContainer');
      container.innerHTML = '';
      const saved = state.answers[state.current];
      if (q.type === 'likert') {
        const labels = ['Nada parecido','Poco','Variable','Bastante','Muchísimo'];
        container.innerHTML = `<div class="opts-likert"><div class="likert-label-row"><span>Nada parecido a mí</span><span>Me representa muchísimo</span></div><div class="likert-row">${[1,2,3,4,5].map(n=>`<button class="lk-btn${saved===n?' sel':''}" onclick="pickLikert(${n})">${n}<span class="lk-sub">${labels[n-1]}</span></button>`).join('')}</div></div>`;
      } else {
        const letters = ['A','B','C','D'];
        container.innerHTML = `<div class="opts-abcd">${q.options.map((o,i)=>`<button class="opt-btn${saved===i?' sel':''}" onclick="pickABCD(${i})"><div class="opt-letter">${letters[i]}</div><span>${o}</span></button>`).join('')}</div>`;
      }
      document.getElementById('btnBack').style.visibility = state.current===0?'hidden':'visible';
      updateNxtBtn();
    }

    function pickABCD(idx){const t=performance.now()-state.questionStartTime;state.responseTimes[state.current]=t;state.answers[state.current]=idx;document.querySelectorAll('.opt-btn').forEach((b,i)=>b.classList.toggle('sel',i===idx));updateNxtBtn();}
    function pickLikert(n){const t=performance.now()-state.questionStartTime;state.responseTimes[state.current]=t;state.answers[state.current]=n;document.querySelectorAll('.lk-btn').forEach((b,i)=>b.classList.toggle('sel',(i+1)===n));updateNxtBtn();}
    function updateNxtBtn(){const has=state.answers[state.current]!==undefined;const btn=document.getElementById('btnNxt');btn.classList.toggle('on',has);btn.textContent=state.current===state.questions.length-1?'Ver Resultados ✓':'Siguiente →';}
    function nextQ(){if(!document.getElementById('btnNxt').classList.contains('on'))return;if(state.current<state.questions.length-1){state.current++;renderQ();}else runAnalysis();}
    function prevQ(){if(state.current>0){state.current--;renderQ();}}

    function runAnalysis(){
      goTo('analyzing');makeParticles('ptBg2');const steps=7;
      for(let i=1;i<=steps;i++) setTimeout((idx)=>{const el=document.getElementById('as'+idx);if(!el)return;el.classList.add('vis','cur');if(idx>1){const prev=document.getElementById('as'+(idx-1));if(prev){prev.classList.remove('cur');prev.classList.add('done');}}},i*500,i);
      setTimeout(()=>{buildResults();goTo('results');},steps*500+600);
    }

    // ==================== SUBMIT TO NEXUS DNA ====================
    function submitToNexus(vec, mii, indices, masterIndices, primary, secondary, validation, centro, v) {
      var payload = {
        test_tipo: 'identitymap',
        nexus_score: mii,
        mii: mii,
        primary_archetype: primary,
        secondary_archetype: secondary,
        primary_pattern: primary,
        secondary_pattern: secondary,
        centro_motivacional: centro.label,
        IM01:vec.IM01, IM02:vec.IM02, IM03:vec.IM03, IM04:vec.IM04, IM05:vec.IM05,
        IM06:vec.IM06, IM07:vec.IM07, IM08:vec.IM08, IM09:vec.IM09,
        autoexigencia:indices.autoexigencia, conexion:indices.conexion, autonomia:indices.autonomia,
        profundidad:indices.profundidad, apertura:indices.apertura, seguridad:indices.seguridad,
        liderazgo_score:masterIndices.Liderazgo, cooperacion_score:masterIndices.Cooperacion,
        innovacion_score:masterIndices.Innovacion, analisis_score:masterIndices.Analisis,
        ejecucion_score:masterIndices.Ejecucion, estabilidad_score:masterIndices.Estabilidad,
        autenticidad_score:masterIndices.Autenticidad, resiliencia_score:masterIndices.Resiliencia,
        leadership_score:masterIndices.Liderazgo, innovation_score:masterIndices.Innovacion,
        motivation_score: mii, cognitive_score:masterIndices.Analisis,
        executive_score:masterIndices.Ejecucion, emotional_score:masterIndices.Cooperacion,
        career_score:masterIndices.Autenticidad, future_score:masterIndices.Estabilidad,
        technology_score:masterIndices.Innovacion,
        reliability:validation.reliability,
        version:v,
        dimensiones: DIM_ORDER.map(function(d){ return { label:ARCHETYPES[d].name, score:vec[d], color:DIM_META[d].color }; })
      };
      if (!NEXUS_URL_ENVIAR) { console.log('[IdentityMap] Standalone — payload listo para Nexus DNA', payload); return; }
      var fd = new FormData();
      fd.append('csrfmiddlewaretoken', getCsrfToken());
      fd.append('resultados_json', JSON.stringify(payload));
      fetch(NEXUS_URL_ENVIAR, { method:'POST', body:fd })
        .then(function(resp){ window._imSesionUrl=(resp.redirected&&resp.url)?resp.url:NEXUS_URL_LISTA; console.log('[IdentityMap] Resultados enviados a Nexus DNA'); })
        .catch(function(err){ console.warn('[IdentityMap] Error al enviar:', err); });
    }

    // ==================== BUILD RESULTS ====================
    function buildResults(){
      const v = state.version;
      const vec = computeVector();
      const mii = computeMII(vec);
      const indices = computeIdentityIndices(vec);
      const masterIndices = computeMasterIndices(vec);
      const validation = computeValidationEngine(state.answers, state.questions, state.responseTimes);
      const centro = computeCentro(vec);
      const tensions = computeTensions(vec);
      const scenarios = computeScenarioScores(vec);
      const benchmarks = computeBenchmarks(vec);

      const arcScores = computeArchetypeScores(vec);
      const sorted = Object.entries(arcScores).sort((a,b)=>b[1]-a[1]);
      const primaryK = sorted[0][0];
      const secondaryK = sorted[1] ? sorted[1][0] : '';
      const tertiaryK = sorted[2] ? sorted[2][0] : '';
      const primary = ARCHETYPES[primaryK].name;
      const secondary = secondaryK ? ARCHETYPES[secondaryK].name : '';
      const tertiary = tertiaryK ? ARCHETYPES[tertiaryK].name : '';
      const archInfo = ARCHETYPES[primaryK];
      const insights = ARCHETYPE_INSIGHTS[primaryK];
      const body = document.getElementById('resBody');

      // Etiqueta MII
      let miiLabel = 'Perfil en formación';
      if (mii >= 85) miiLabel = 'Identidad muy definida';
      else if (mii >= 75) miiLabel = 'Perfil bien diferenciado';
      else if (mii >= 65) miiLabel = 'Perfil claro';
      else if (mii >= 55) miiLabel = 'Perfil en formación';
      else miiLabel = 'Perfil poco diferenciado';

      const resultLabel = secondary ? `${primary} – ${secondary}` : primary;

      // ---- HERO ----
      const heroHTML = `<div class="hero-card" style="background:linear-gradient(145deg,${archInfo.color}E0,${archInfo.color}90)">
        <div class="hero-grid">
          <div>
            <div class="hero-tag">Patrón Motivacional Principal · IdentityMap · Nexus DNA</div>
            <div class="hero-name">${archInfo.icon} ${resultLabel}</div>
            <div class="hero-desc">${archInfo.desc}</div>
            <div class="hero-chips">
              <div class="h-chip">${archInfo.chip1}</div>
              <div class="h-chip">${archInfo.chip2}</div>
              <div class="h-chip">${archInfo.chip3}</div>
              ${v!=='essential'?`<div class="h-chip">${miiLabel}</div>`:''}
            </div>
          </div>
          <div class="hero-circle">
            <div class="hc-n">${mii}</div>
            <div class="hc-l">MII Score</div>
          </div>
        </div>
      </div>`;

      // ---- SECUNDARIO ----
      const secScore = sorted[1] ? Math.round(sorted[1][1]) : 0;
      const secMeta = secondaryK ? ARCHETYPES[secondaryK] : {};
      const secHTML = secondaryK ? `<div style="background:#fff;border:1px solid var(--brd);border-radius:var(--r-xl);padding:24px 32px;margin-bottom:24px;display:flex;align-items:center;gap:20px;animation:fadeUp .5s .1s both">
        <div style="width:56px;height:56px;border-radius:14px;background:${secMeta.color}22;border:2px solid ${secMeta.color};display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${secMeta.icon}</div>
        <div style="flex:1"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#94A3B8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px">Patrón Secundario</div><div style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#0E2235">${secondary}</div><div style="font-size:13px;color:#4A5568;margin-top:2px">${secMeta.desc||''}</div></div>
        <div style="font-family:'Montserrat',sans-serif;font-size:32px;font-weight:900;color:${secMeta.color}">${secScore}</div>
      </div>` : '';

      // ---- VECTOR 9 PATRONES ----
      const vecRows = DIM_ORDER.map(k=>`<div class="tii-row"><div class="tii-rl">${DIM_META[k].icon} ${ARCHETYPES[k].name}</div><div class="tii-rt"><div class="tii-rf" style="width:0%;background:${DIM_META[k].color}" data-target="${vec[k]}"></div></div><div class="tii-rv">${vec[k]}</div></div>`).join('');
      const vecHTML = `<div class="sec"><div class="sec-h">📊 Perfil de Patrones Motivacionales</div><div class="tii-grid"><div class="gauge-wrap"><canvas class="gauge-svg" id="gaugeC" width="220" height="130"></canvas><div class="gauge-info"><div class="gauge-n" id="miiNum">0</div><div class="gauge-lbl">MII Global</div></div></div><div class="tii-bars">${vecRows}</div></div></div>`;

      // ---- CHARTS ----
      const chartsHTML = `<div class="charts-2"><div class="chart-box"><div class="chart-h">🧭 Radar Motivacional</div><div class="chart-inner"><canvas id="radarC"></canvas></div></div><div class="chart-box"><div class="chart-h">📈 Índices de Identidad</div><div class="chart-inner"><canvas id="barC"></canvas></div></div></div>`;

      // ---- ÍNDICES DE IDENTIDAD ----
      const indicesItems = [
        {label:'Autoexigencia',icon:'🎯',color:'#10B981',value:indices.autoexigencia},
        {label:'Conexión',icon:'❤️',color:'#EC4899',value:indices.conexion},
        {label:'Autonomía',icon:'🦁',color:'#EF4444',value:indices.autonomia},
        {label:'Profundidad',icon:'🔍',color:'#06B6D4',value:indices.profundidad},
        {label:'Apertura',icon:'🧭',color:'#3B82F6',value:indices.apertura},
        {label:'Seguridad',icon:'🛡️',color:'#0EA5E9',value:indices.seguridad}
      ];
      const indicesHTML = `<div class="sec-h">⚡ Índices de Identidad</div><div class="comp-grid">${indicesItems.map(c=>`<div class="comp-c"><div class="comp-icon">${c.icon}</div><div class="comp-lbl">${c.label}</div><div class="comp-score" style="color:${c.color}">${c.value}</div><div class="comp-bar"><div class="comp-fill" style="width:${c.value}%;background:${c.color}"></div></div></div>`).join('')}</div>`;

      // ---- GRID 9 PATRONES ----
      const arcAllHTML = `<div class="sec-h" style="margin-top:24px">🏛️ Tus 9 Patrones</div><div class="arc-all">${sorted.map(([k,score],i)=>`<div class="arc-item${i===0?' top1':''}"><div class="arc-emoji">${ARCHETYPES[k].icon}</div><div class="arc-nm">${ARCHETYPES[k].name}</div><div class="arc-sc" style="color:${ARCHETYPES[k].color}">${Math.round(score)}%</div></div>`).join('')}</div>`;

      // ---- VALIDACIÓN ----
      const valHTML = `<div class="sec-h">✅ Validación Psicométrica</div><div class="valid-grid">
        <div class="val-card"><div class="val-score" style="color:#22C55E">${validation.consistency}</div><div class="val-lbl">Consistencia</div><div class="val-bar"><div class="val-fill" style="width:${validation.consistency}%;background:#22C55E"></div></div></div>
        <div class="val-card"><div class="val-score" style="color:#0EA5E9">${validation.attention}</div><div class="val-lbl">Atención</div><div class="val-bar"><div class="val-fill" style="width:${validation.attention}%;background:#0EA5E9"></div></div></div>
        <div class="val-card"><div class="val-score" style="color:#7C3AED">${validation.authenticity}</div><div class="val-lbl">Anti-Fake</div><div class="val-bar"><div class="val-fill" style="width:${validation.authenticity}%;background:#7C3AED"></div></div></div>
        <div class="val-card"><div class="val-score" style="color:${validation.reliabilityColor}">${validation.reliability}</div><div class="val-lbl">Fiabilidad</div><div class="val-bar"><div class="val-fill" style="width:${validation.reliability}%;background:${validation.reliabilityColor}"></div></div></div>
      </div><div style="margin-top:12px;padding:14px 18px;background:${validation.reliability>=70?'rgba(34,197,94,.06)':'rgba(239,68,68,.06)'};border:1px solid ${validation.reliability>=70?'rgba(34,197,94,.2)':'rgba(239,68,68,.2)'};border-radius:12px;font-size:13px;color:${validation.reliabilityColor};font-weight:600">${validation.reliabilityStatus}</div>`;

      // ---- NEXUS BASE JSON ----
      const nexusHTML = `<div class="nexus-card"><div class="sec-h" style="color:#fff">🔗 Nexus DNA Connector</div><div class="dna-json"><span class="jb">{</span><br>&nbsp;&nbsp;<span class="jk">"module"</span>: <span class="js">"IdentityMap"</span>,<br>&nbsp;&nbsp;<span class="jk">"primary_pattern"</span>: <span class="js">"${primary}"</span>,<br>&nbsp;&nbsp;<span class="jk">"secondary_pattern"</span>: <span class="js">"${secondary}"</span>,<br>&nbsp;&nbsp;<span class="jk">"motivational_identity_index"</span>: <span class="jn">${mii}</span>,<br>&nbsp;&nbsp;<span class="jk">"centro_motivacional"</span>: <span class="js">"${centro.label}"</span>,<br>&nbsp;&nbsp;<span class="jk">"autoexigencia"</span>: <span class="jn">${indices.autoexigencia}</span>,<br>&nbsp;&nbsp;<span class="jk">"conexion"</span>: <span class="jn">${indices.conexion}</span>,<br>&nbsp;&nbsp;<span class="jk">"autonomia"</span>: <span class="jn">${indices.autonomia}</span><br><span class="jb">}</span></div><p style="font-size:11px;color:rgba(255,255,255,.5);margin-top:12px">* Nexus DNA Standard · Integración con CoreValues, PersonaSphere, Cognitype, EmotionSync</p></div>`;

      // ==== SECCIONES ADVANCED ====
      const centroHTML = v!=='essential' ? `<div class="sec" style="animation:fadeUp .5s .15s both"><div class="sec-h">🎨 Centro Motivacional Dominante</div>
        <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
          <div style="width:80px;height:80px;border-radius:20px;background:${centro.color}18;border:2px solid ${centro.color};display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0">${centro.icon}</div>
          <div style="flex:1;min-width:220px"><div style="font-family:'Montserrat',sans-serif;font-size:22px;font-weight:800;color:#0E2235;margin-bottom:6px">${centro.label}</div><div style="font-size:14px;color:#4A5568;line-height:1.7">${centro.desc}</div></div>
          <div style="text-align:center;flex-shrink:0"><div style="font-family:'Montserrat',sans-serif;font-size:44px;font-weight:900;color:${centro.color};line-height:1">${centro.pct}</div><div style="font-size:10px;color:#94A3B8;text-transform:uppercase;letter-spacing:1px">Intensidad</div></div>
        </div>
      </div>` : '';

      const insightsHTML = v!=='essential' ? `<div style="background:linear-gradient(145deg,#060F1A,#0E2235);border-radius:var(--r-xl);padding:32px;margin-bottom:24px;color:#fff">
        <div class="sec-h" style="color:#fff;margin-bottom:20px">🔍 Análisis de tu Patrón</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#22C55E;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">✅ Fortalezas</div>
            ${insights.strengths.map(s=>`<div style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:rgba(255,255,255,.8);margin-bottom:8px;line-height:1.5"><span style="color:#22C55E;flex-shrink:0">▸</span>${s}</div>`).join('')}
          </div>
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#F59E0B;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">⚠️ Riesgos a gestionar</div>
            ${insights.risks.map(r=>`<div style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:rgba(255,255,255,.8);margin-bottom:8px;line-height:1.5"><span style="color:#F59E0B;flex-shrink:0">▸</span>${r}</div>`).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#00D4FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">🎯 Dónde brillas</div><div style="font-size:13px;color:rgba(255,255,255,.8);line-height:1.7">${insights.context_best}</div></div>
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#EC4899;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">⚡ Mayor reto</div><div style="font-size:13px;color:rgba(255,255,255,.8);line-height:1.7">${insights.context_challenge}</div></div>
        </div>
      </div>` : '';

      const topBench = Object.entries(benchmarks);
      const benchmarkHTML = v!=='essential' ? `<div class="benchmark-card"><div class="career-header"><div><div style="font-size:13px;opacity:.7">📊 BENCHMARK GLOBAL</div><div style="font-size:20px;font-weight:700;">Comparativa poblacional</div></div><div class="compatibility-score"><div class="compatibility-number">${topBench.find(([k])=>k===primaryK)?.[1]?.percentile||55}</div><div class="compatibility-label">Percentil</div></div></div><div class="benchmark-grid">${topBench.map(([k,b])=>`<div class="benchmark-item"><span style="font-weight:600">${b.label}</span><span style="font-size:18px;font-weight:700">${b.score}</span><span style="font-size:11px;opacity:.7">P${b.percentile}</span></div>`).join('')}</div></div>` : '';

      // ==== SECCIONES PREMIUM ====
      const masterItems = [
        {label:'Liderazgo',icon:'👑',color:'#EF4444',value:masterIndices.Liderazgo},
        {label:'Cooperación',icon:'🤝',color:'#EC4899',value:masterIndices.Cooperacion},
        {label:'Innovación',icon:'💡',color:'#7C3AED',value:masterIndices.Innovacion},
        {label:'Análisis',icon:'🔍',color:'#06B6D4',value:masterIndices.Analisis},
        {label:'Ejecución',icon:'⚙️',color:'#F59E0B',value:masterIndices.Ejecucion},
        {label:'Estabilidad',icon:'🛡️',color:'#0EA5E9',value:masterIndices.Estabilidad},
        {label:'Autenticidad',icon:'🎭',color:'#8B5CF6',value:masterIndices.Autenticidad},
        {label:'Resiliencia',icon:'🔥',color:'#10B981',value:masterIndices.Resiliencia}
      ];
      const masterHTML = v==='premium' ? `<div class="nexus-card" style="margin-bottom:24px"><div class="sec-h" style="color:#fff;margin-bottom:20px">📡 Índices Maestros · Nexus DNA</div>
        <div style="display:flex;flex-direction:column;gap:12px">${masterItems.map(m=>`<div style="display:flex;align-items:center;gap:14px"><div style="width:32px;text-align:center;font-size:18px">${m.icon}</div><div style="width:130px;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:600;color:${m.color}">${m.label}</div><div style="flex:1;height:8px;background:rgba(255,255,255,.1);border-radius:999px;overflow:hidden"><div style="height:100%;width:${m.value}%;background:${m.color};border-radius:999px"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:#fff;width:36px;text-align:right">${m.value}</div></div>`).join('')}
        </div>
      </div>` : '';

      const severityColors = {warning:'#EF4444',caution:'#F59E0B',info:'#0EA5E9',ok:'#22C55E'};
      const tensHTML = v==='premium' ? `<div class="sec"><div class="sec-h">🧬 Tensiones Motivacionales</div>
        <p style="font-size:13px;color:#4A5568;margin-bottom:16px;line-height:1.7">Pares de patrones en tensión que pueden generar conflictos internos o puntos ciegos.</p>
        <div style="display:flex;flex-direction:column;gap:12px">${tensions.map(b=>`<div style="display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:${severityColors[b.severity]}08;border:1px solid ${severityColors[b.severity]}22;border-left:4px solid ${severityColors[b.severity]};border-radius:12px"><span style="font-size:20px;flex-shrink:0">${b.icon}</span><div><div style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;color:#0E2235;margin-bottom:4px">${b.name}</div><div style="font-size:13px;color:#4A5568;line-height:1.6">${b.desc}</div></div></div>`).join('')}
        </div>
      </div>` : '';

      const scenariosHTML = v==='premium' ? `<div class="sec"><div class="sec-h">🎭 Encaje por Contexto Profesional</div>
        <p style="font-size:13px;color:#4A5568;margin-bottom:20px;line-height:1.7">Tu encaje motivacional en 6 contextos laborales clave, calculado desde tu perfil de patrones.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px">${scenarios.map(sc=>{const lvl=sc.score>=80?{t:'Muy alto',c:'#22C55E'}:sc.score>=65?{t:'Alto',c:'#0EA5E9'}:sc.score>=50?{t:'Medio',c:'#F59E0B'}:{t:'A desarrollar',c:'#EF4444'};return `<div style="padding:18px 20px;background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:14px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:22px">${sc.icon}</span><div style="font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;color:#0E2235">${sc.name}</div></div><span style="font-size:11px;font-weight:700;color:#fff;background:${lvl.c};padding:3px 10px;border-radius:999px">${lvl.t}</span></div><div style="font-size:11px;color:#64748B;margin-bottom:10px">${sc.desc}</div><div style="display:flex;align-items:center;gap:10px"><div style="flex:1;height:6px;background:#E2E8F0;border-radius:999px;overflow:hidden"><div style="height:100%;width:${sc.score}%;background:${lvl.c};border-radius:999px"></div></div><div style="font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:#0E2235;width:28px">${sc.score}</div></div></div>`;}).join('')}
        </div>
      </div>` : '';

      const devHTML = v==='premium' ? `<div style="background:linear-gradient(135deg,#0E2235,#1B3C59);border-radius:var(--r-xl);padding:32px;margin-bottom:24px;color:#fff">
        <div class="sec-h" style="color:#fff;margin-bottom:8px">🚀 Plan de Desarrollo Personal</div>
        <p style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:24px">Recomendaciones personalizadas para el patrón <strong style="color:#00D4FF">${primary}</strong>.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#00D4FF;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px">📚 Áreas de desarrollo</div>${insights.dev_areas.map((d,i)=>`<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px"><div style="width:22px;height:22px;border-radius:6px;background:rgba(0,212,255,.15);border:1px solid rgba(0,212,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:10px;color:#00D4FF;flex-shrink:0">${i+1}</div><div style="font-size:13px;color:rgba(255,255,255,.8);line-height:1.6">${d}</div></div>`).join('')}</div>
          <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#10B981;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px">🎯 Tu estilo</div><div style="font-size:14px;color:rgba(255,255,255,.85);line-height:1.8;font-style:italic">"${insights.estilo}"</div><div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#F59E0B;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">Patrones a integrar</div>${Object.entries(vec).sort((a,b)=>a[1]-b[1]).slice(0,3).map(([k,val])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:12px;color:rgba(255,255,255,.6);width:120px">${ARCHETYPES[k].name}</span><div style="flex:1;height:4px;background:rgba(255,255,255,.1);border-radius:999px"><div style="height:100%;width:${val}%;background:#F59E0B;border-radius:999px"></div></div><span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#F59E0B">${val}</span></div>`).join('')}</div></div>
        </div>
        <div style="background:rgba(255,255,255,.04);border-radius:16px;padding:20px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#7C3AED;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">🏆 Tus patrones más fuertes</div><div style="display:flex;flex-wrap:wrap;gap:8px">${Object.entries(vec).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,val])=>`<div style="background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);border-radius:999px;padding:6px 14px;font-size:12px;color:#fff;font-weight:600">${ARCHETYPES[k].name}: <span style="color:#7C3AED">${val}</span></div>`).join('')}</div></div>
      </div>` : '';

      // Compatibilidad profesional (premium)
      const compatRoles = (COMPAT[primaryK]||[]).concat(COMPAT[secondaryK]||[]).filter((x,i,a)=>a.indexOf(x)===i).slice(0,6);
      const fitScore = Math.round(mii*0.5 + validation.reliability*0.3 + masterIndices.Liderazgo*0.2);
      const fitLabel = fitScore>=80?{t:'Excelente',c:'excellent'}:fitScore>=70?{t:'Muy recomendable',c:'excellent'}:fitScore>=60?{t:'Recomendable',c:'good'}:{t:'En desarrollo',c:'moderate'};
      const recruiterHTML = v==='premium' ? `<div class="nexus-card" style="margin-bottom:24px"><div class="career-header"><div><div style="font-size:13px;opacity:.7">🎯 COMPATIBILIDAD PROFESIONAL</div><div style="font-size:20px;font-weight:700;">Encaje y orientación de rol</div></div><div class="compatibility-score"><div class="compatibility-number">${fitScore}</div><div class="compatibility-label">Fit Score</div><div class="compatibility-badge ${fitLabel.c}">${fitLabel.t}</div></div></div>
        <div class="metrics-grid"><div class="metric-card"><div class="metric-value">${mii}</div><div class="metric-label">MII</div></div><div class="metric-card"><div class="metric-value">${masterIndices.Liderazgo}</div><div class="metric-label">Liderazgo</div></div><div class="metric-card"><div class="metric-value">${masterIndices.Cooperacion}</div><div class="metric-label">Cooperación</div></div><div class="metric-card"><div class="metric-value">${masterIndices.Innovacion}</div><div class="metric-label">Innovación</div></div><div class="metric-card"><div class="metric-value">${masterIndices.Analisis}</div><div class="metric-label">Análisis</div></div><div class="metric-card"><div class="metric-value">${validation.reliability}%</div><div class="metric-label">Fiabilidad</div></div></div>
        <div style="margin-top:20px;padding:16px 20px;background:rgba(255,255,255,.05);border-radius:12px"><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.5);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px">Roles con mayor afinidad motivacional</div><div style="display:flex;flex-wrap:wrap;gap:8px">${compatRoles.map(r=>`<span style="background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.2);border-radius:999px;padding:4px 12px;font-size:12px;color:#fff">${r}</span>`).join('')}</div></div>
      </div>` : '';

      const nexusPremiumHTML = v==='premium' ? `<div class="nexus-card"><div class="sec-h" style="color:#fff">🔗 Nexus DNA Connector · Premium</div><div class="dna-json"><span class="jb">{</span><br>&nbsp;&nbsp;<span class="jk">"module"</span>: <span class="js">"IdentityMap"</span>,<br>&nbsp;&nbsp;<span class="jk">"version"</span>: <span class="js">"2026.1-premium"</span>,<br>&nbsp;&nbsp;<span class="jk">"primary_pattern"</span>: <span class="js">"${primary}"</span>,<br>&nbsp;&nbsp;<span class="jk">"secondary_pattern"</span>: <span class="js">"${secondary}"</span>,<br>&nbsp;&nbsp;<span class="jk">"tertiary_pattern"</span>: <span class="js">"${tertiary}"</span>,<br>&nbsp;&nbsp;<span class="jk">"motivational_identity_index"</span>: <span class="jn">${mii}</span>,<br>&nbsp;&nbsp;<span class="jk">"identity_label"</span>: <span class="js">"${miiLabel}"</span>,<br>&nbsp;&nbsp;<span class="jk">"centro_motivacional"</span>: <span class="js">"${centro.label}"</span>,<br>&nbsp;&nbsp;<span class="jk">"liderazgo"</span>: <span class="jn">${masterIndices.Liderazgo}</span>,<br>&nbsp;&nbsp;<span class="jk">"cooperacion"</span>: <span class="jn">${masterIndices.Cooperacion}</span>,<br>&nbsp;&nbsp;<span class="jk">"innovacion"</span>: <span class="jn">${masterIndices.Innovacion}</span>,<br>&nbsp;&nbsp;<span class="jk">"analisis"</span>: <span class="jn">${masterIndices.Analisis}</span>,<br>&nbsp;&nbsp;<span class="jk">"autenticidad"</span>: <span class="jn">${masterIndices.Autenticidad}</span>,<br>&nbsp;&nbsp;<span class="jk">"resiliencia"</span>: <span class="jn">${masterIndices.Resiliencia}</span>,<br>&nbsp;&nbsp;<span class="jk">"fit_score"</span>: <span class="jn">${fitScore}</span>,<br>&nbsp;&nbsp;<span class="jk">"reliability_index"</span>: <span class="jn">${validation.reliability}</span>,<br>&nbsp;&nbsp;<span class="jk">"nexus_dna_weight"</span>: <span class="jn">0.20</span><br><span class="jb">}</span></div><p style="font-size:11px;color:rgba(255,255,255,.5);margin-top:12px">* Output premium para integración avanzada Nexus DNA</p></div>` : nexusHTML;

      // ---- AI (premium) ----
      const aiPayload = v==='premium' ? JSON.stringify({
        primary, secondary, tertiary, mii, miiLabel,
        centro: centro.label,
        vec, indices, masterIndices, benchmarks,
        tensions: tensions.map(t=>t.name),
        scenarios, fitScore,
        reliability: validation.reliability,
        reliabilityStatus: validation.reliabilityStatus
      }) : '';

      const aiHTML = v==='premium' ? `<div id="aiSection" style="margin-bottom:24px">
        <div style="background:linear-gradient(145deg,#060F1A,#0A1628);border-radius:var(--r-xl);padding:36px;border:1px solid rgba(0,212,255,.15);position:relative;overflow:hidden">
          <div style="position:absolute;top:0;right:0;width:200px;height:200px;background:radial-gradient(circle,rgba(124,58,237,.15),transparent 70%);pointer-events:none"></div>
          <div style="position:absolute;bottom:0;left:0;width:180px;height:180px;background:radial-gradient(circle,rgba(0,212,255,.1),transparent 70%);pointer-events:none"></div>
          <div style="position:relative;z-index:1">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,rgba(0,212,255,.2),rgba(124,58,237,.2));border:1px solid rgba(0,212,255,.3);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">✨</div>
              <div>
                <div style="font-family:'Montserrat',sans-serif;font-size:18px;font-weight:800;color:#fff">Análisis Narrativo con IA</div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(0,212,255,.7);letter-spacing:1.5px;text-transform:uppercase">Powered by Nexus DNA Premium</div>
              </div>
            </div>
            <p style="font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:24px;max-width:580px">La IA analizará tu perfil motivacional completo y generará un informe narrativo personalizado: retrato de identidad, tensiones internas, zona de máximo valor y plan de desarrollo.</p>
            <div id="aiBtn" style="display:flex;gap:12px;flex-wrap:wrap">
              <button onclick="generateAI('personal')" style="display:flex;align-items:center;gap:8px;padding:14px 24px;background:linear-gradient(135deg,#00D4FF,#0099BB);color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;transition:all .2s;box-shadow:0 0 24px rgba(0,212,255,.3)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 40px rgba(0,212,255,.5)'" onmouseout="this.style.transform='';this.style.boxShadow='0 0 24px rgba(0,212,255,.3)'">✨ Análisis Personal</button>
              <button onclick="generateAI('recruiter')" style="display:flex;align-items:center;gap:8px;padding:14px 24px;background:linear-gradient(135deg,#7C3AED,#5B21B6);color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;transition:all .2s;box-shadow:0 0 24px rgba(124,58,237,.3)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 40px rgba(124,58,237,.5)'" onmouseout="this.style.transform='';this.style.boxShadow='0 0 24px rgba(124,58,237,.3)'">📋 Informe Profesional</button>
              <button onclick="generateAI('full')" style="display:flex;align-items:center;gap:8px;padding:14px 24px;background:linear-gradient(135deg,#10B981,#059669);color:#fff;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;transition:all .2s;box-shadow:0 0 24px rgba(16,185,129,.3)" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 40px rgba(16,185,129,.5)'" onmouseout="this.style.transform='';this.style.boxShadow='0 0 24px rgba(16,185,129,.3)'">🚀 Informe Completo</button>
            </div>
            <div id="aiOutput" style="display:none;margin-top:28px">
              <div id="aiLoading" style="display:flex;align-items:center;gap:12px;padding:20px;background:rgba(255,255,255,.04);border-radius:12px">
                <div style="width:20px;height:20px;border:2px solid rgba(0,212,255,.3);border-top-color:#00D4FF;border-radius:50%;animation:spin 1s linear infinite;flex-shrink:0"></div>
                <span style="font-size:13px;color:rgba(255,255,255,.6)" id="aiLoadingText">Analizando tu perfil motivacional...</span>
              </div>
              <div id="aiResult" style="display:none"></div>
            </div>
          </div>
        </div>
      </div>` : '';

      window._imAIPayload = aiPayload;

      // ---- Disclaimer legal ----
      const footerHTML = `<div style="margin-top:8px;padding:16px 20px;background:#F8FAFC;border:1px solid #EEF2F7;border-radius:12px;font-size:11px;color:#94A3B8;line-height:1.6;text-align:center">IdentityMap es una herramienta de autoconocimiento y orientación. <strong>No constituye un diagnóstico clínico ni psicológico</strong> y no debe usarse como tal. Sus resultados son orientativos y describen patrones motivacionales, no rasgos fijos de personalidad.</div>`;

      // ==== ENSAMBLAJE POR VERSIÓN ====
      let sections = '';
      if (v === 'essential') {
        sections = heroHTML + secHTML + vecHTML + chartsHTML + `<div class="sec">${indicesHTML}${arcAllHTML}</div>` + `<div class="sec">${valHTML}</div>` + nexusHTML + footerHTML;
      } else if (v === 'advanced') {
        sections = heroHTML + secHTML + centroHTML + vecHTML + chartsHTML + `<div class="sec">${indicesHTML}${arcAllHTML}</div>` + insightsHTML + benchmarkHTML + `<div class="sec">${valHTML}</div>` + nexusHTML + footerHTML;
      } else {
        sections = heroHTML + secHTML + masterHTML + centroHTML + vecHTML + chartsHTML + `<div class="sec">${indicesHTML}${arcAllHTML}</div>` + insightsHTML + tensHTML + scenariosHTML + devHTML + recruiterHTML + benchmarkHTML + `<div class="sec">${valHTML}</div>` + nexusPremiumHTML + aiHTML + footerHTML;
      }
      body.innerHTML = sections;

      submitToNexus(vec, mii, indices, masterIndices, primary, secondary, validation, centro, v);

      requestAnimationFrame(()=>setTimeout(()=>{
        drawGauge('gaugeC', mii);
        animNum('miiNum', 0, mii, 1300);
        document.querySelectorAll('.tii-rf').forEach(el=>el.style.width=el.dataset.target+'%');
        drawRadar(vec);
        drawBar(indices);
      }, 180));
    }

    // ==================== AI ANALYSIS ====================
    async function generateAI(mode) {
      const payload = window._imAIPayload ? JSON.parse(window._imAIPayload) : null;
      if (!payload) return;
      const vec = payload.vec, indices = payload.indices, scenarios = payload.scenarios || [];

      const output = document.getElementById('aiOutput');
      const loading = document.getElementById('aiLoading');
      const result = document.getElementById('aiResult');
      const loadingText = document.getElementById('aiLoadingText');
      const btnContainer = document.getElementById('aiBtn');

      output.style.display = 'block';
      loading.style.display = 'flex';
      result.style.display = 'none';
      btnContainer.style.opacity = '0.4';
      btnContainer.style.pointerEvents = 'none';

      const msgs = {
        personal:  ['Analizando tu perfil motivacional...','Detectando tensiones entre patrones...','Redactando tu retrato de identidad...'],
        recruiter: ['Procesando encaje profesional...','Evaluando patrones de comportamiento...','Redactando informe profesional...'],
        full:      ['Analizando 9 patrones motivacionales...','Cruzando patrones y tensiones...','Generando informe completo...']
      };
      let mi = 0;
      const interval = setInterval(()=>{ mi=(mi+1)%msgs[mode].length; loadingText.textContent=msgs[mode][mi]; }, 2000);
      loadingText.textContent = msgs[mode][0];

      const profile = `PERFIL IDENTITYMAP
Patrón Principal: ${payload.primary} | Secundario: ${payload.secondary} | Terciario: ${payload.tertiary}
MII: ${payload.mii}/100 (${payload.miiLabel}) | Centro: ${payload.centro} | Fiabilidad: ${payload.reliability}% | Fit Score: ${payload.fitScore}
Vector: Reformador ${vec.IM01} | Protector ${vec.IM02} | Constructor ${vec.IM03} | Individualista ${vec.IM04} | Investigador ${vec.IM05} | Precavido ${vec.IM06} | Explorador ${vec.IM07} | Desafiador ${vec.IM08} | Pacificador ${vec.IM09}
Índices: Autoexigencia ${indices.autoexigencia} | Conexión ${indices.conexion} | Autonomía ${indices.autonomia} | Profundidad ${indices.profundidad} | Apertura ${indices.apertura} | Seguridad ${indices.seguridad}
Contextos: ${scenarios.map(s=>s.name+' '+s.score+'/100').join(' | ')}
Tensiones detectadas: ${payload.tensions.join(', ')}`;

      const prompts = {
        personal: `Eres un experto en psicología de la personalidad y eneatipos del ecosistema Nexus 2026. Analiza este perfil IdentityMap y genera un informe narrativo PERSONAL en español.

${profile}

Genera el informe en markdown con estas secciones:

## 🧠 Tu Retrato Motivacional
Un párrafo de 4-5 frases que capture qué mueve a esta persona usando los datos concretos. Busca la historia detrás de los números, no repitas etiquetas.

## ⚡ Tu Tensión Central
La paradoja más relevante entre patrones altos y bajos. Qué significa en situaciones reales con ejemplos concretos.

## 🎯 Tu Zona de Máximo Valor
Qué tipo de entornos, relaciones y retos sacan lo mejor de este perfil. Sé específico.

## 🔍 Tu Punto Ciego
El riesgo más importante según los patrones bajos. Explica el mecanismo y da una estrategia de mejora concreta.

## 🚀 3 Palancas de Desarrollo
Tres acciones específicas para este perfil. Para cada una: qué hacer, cómo y qué cambia.`,

        recruiter: `Eres un especialista senior en selección y desarrollo de talento del ecosistema Nexus 2026. Genera un informe profesional en español basado en este perfil IdentityMap.

${profile}

Genera el informe en markdown con estas secciones:

## 📋 Resumen Profesional
2-3 párrafos legibles en 60 segundos. Valor y riesgos desde una perspectiva motivacional.

## ✅ Fortalezas para el Entorno Laboral
4-5 razones concretas con el dato que las soporta.

## ⚠️ Aspectos a Acompañar
3-4 puntos de atención con sugerencias de desarrollo para cada uno.

## 🎯 Roles con Mayor Encaje
3-4 roles específicos con justificación basada en el perfil. Incluye tipo de entorno donde mejor encaja.

## 📊 Orientación Final
Síntesis del encaje motivacional y recomendación de desarrollo.`,

        full: `Eres el motor de análisis del ecosistema Nexus 2026, especializado en patrones motivacionales. Genera el informe completo más exhaustivo posible en español.

${profile}

Genera el informe completo en markdown con estas secciones:

## 🧠 Retrato Motivacional
El párrafo más preciso sobre qué mueve a esta persona. Usa los números para contar una historia coherente.

## ⚡ Tensiones y Paradojas
Las 2-3 tensiones más significativas entre patrones. Cómo se manifiestan en el día a día.

## 🌟 Contextos de Máximo Rendimiento
Entornos, roles y relaciones donde este perfil brilla. Con ejemplos reales.

## 🔍 Puntos Ciegos y Riesgos
Para cada riesgo: el mecanismo psicológico, cómo se manifiesta y una estrategia de mejora.

## 🧬 Interpretación de Tensiones
Qué significa el patrón de tensiones detectado y sus implicaciones.

## 🚀 Plan de Desarrollo Avanzado
5 palancas con prioridad (Alta/Media), descripción, métrica de progreso y horizonte temporal.

## 🔮 Evolución Proyectada
Cómo puede integrar esta persona sus patrones menos desarrollados y madurar su identidad.`
      };

      try {
        const res = await fetch(AI_ENDPOINT, {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({ model:'gpt-4o', messages:[{role:'user',content:prompts[mode]}], max_tokens:1500, temperature:0.7 })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content || data.content?.[0]?.text || 'Sin respuesta';
        clearInterval(interval);

        const html = text
          .replace(/^## (.*?)$/gm, '<h3 style="font-family:\'Montserrat\',sans-serif;font-size:15px;font-weight:800;color:#fff;margin:22px 0 10px;display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.08)">$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#00D4FF">$1</strong>')
          .replace(/^[\-\u2022] (.*?)$/gm, '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:7px;font-size:13px;color:rgba(255,255,255,.82);line-height:1.65"><span style="color:#00D4FF;flex-shrink:0;margin-top:3px">▸</span><span>$1</span></div>')
          .replace(/^\d+\. (.*?)$/gm, '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;font-size:13px;color:rgba(255,255,255,.82);line-height:1.65"><span style="background:rgba(0,212,255,.15);border:1px solid rgba(0,212,255,.3);border-radius:5px;padding:1px 7px;font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#00D4FF;flex-shrink:0">$1</span></div>')
          .replace(/\n\n/g, '<div style="height:10px"></div>')
          .replace(/\n/g, '<br>');

        loading.style.display = 'none';
        result.style.display = 'block';
        const modeLabel = mode==='personal'?'✨ Análisis Personal':mode==='recruiter'?'📋 Informe Profesional':'🚀 Informe Completo';
        result.innerHTML = `<div style="background:rgba(255,255,255,.04);border-radius:16px;padding:28px;border:1px solid rgba(255,255,255,.08)">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.1)">
            <div style="flex:1"><div style="font-family:'Montserrat',sans-serif;font-size:15px;font-weight:800;color:#fff">${modeLabel}</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(0,212,255,.6);letter-spacing:1px;margin-top:2px">Generado por IA · Nexus DNA Premium</div></div>
            <button onclick="document.getElementById('aiOutput').style.display='none';document.getElementById('aiBtn').style.opacity='1';document.getElementById('aiBtn').style.pointerEvents='all'" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:rgba(255,255,255,.5);font-size:12px;padding:6px 14px;cursor:pointer;font-family:'Montserrat',sans-serif">↺ Nuevo análisis</button>
          </div>
          <div style="font-size:13px;color:rgba(255,255,255,.78);line-height:1.8">${html}</div>
        </div>`;

        if (NEXUS_URL_GUARDAR_INFORME) {
          const tipoMap = {personal:'ai_personal', recruiter:'ai_completo', full:'ai_completo'};
          fetch(NEXUS_URL_GUARDAR_INFORME, {
            method:'POST',
            headers:{ 'Content-Type':'application/json', 'X-CSRFToken':getCsrfToken() },
            body: JSON.stringify({ tipo:(tipoMap[mode]||'ai_personal'), contenido_html:`<div class="im-ai-report"><h2>${modeLabel} — IdentityMap</h2>${html}</div>` })
          }).then(r=>r.json()).then(d=>{ if(d&&d.ok) console.log('[IdentityMap] Informe guardado'); }).catch(e=>console.warn('[IdentityMap] Error guardando:', e));
        }
      } catch(err) {
        clearInterval(interval);
        loading.style.display = 'none';
        result.style.display = 'block';
        result.innerHTML = `<div style="padding:20px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:12px">
          <div style="font-family:'Montserrat',sans-serif;font-weight:700;color:#EF4444;margin-bottom:8px">⚠️ Error al conectar con la IA</div>
          <div style="font-size:13px;color:rgba(255,255,255,.65);line-height:1.7;margin-bottom:12px">Esta función requiere el endpoint <code style="background:rgba(255,255,255,.08);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:11px">${AI_ENDPOINT}</code> activo en tu plataforma. En modo standalone no está disponible.</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.35)">${err.message}</div>
          <button onclick="document.getElementById('aiOutput').style.display='none';document.getElementById('aiBtn').style.opacity='1';document.getElementById('aiBtn').style.pointerEvents='all'" style="margin-top:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:8px;color:rgba(255,255,255,.5);font-size:12px;padding:6px 14px;cursor:pointer;font-family:'Montserrat',sans-serif">↺ Reintentar</button>
        </div>`;
        btnContainer.style.opacity = '1';
        btnContainer.style.pointerEvents = 'all';
      }
    }

    // ==================== CHARTS ====================
    function drawGauge(id,value){const canvas=document.getElementById(id);if(!canvas)return;const ctx=canvas.getContext('2d');const cx=110,cy=120,r=94;ctx.clearRect(0,0,220,130);ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,2*Math.PI);ctx.strokeStyle='#E2E8F0';ctx.lineWidth=14;ctx.stroke();const end=Math.PI+((value/100)*Math.PI);const grd=ctx.createLinearGradient(0,0,220,0);grd.addColorStop(0,'#00D4FF');grd.addColorStop(1,'#7C3AED');ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,end);ctx.strokeStyle=grd;ctx.lineWidth=14;ctx.stroke();}

    function drawRadar(v){const c=document.getElementById('radarC');if(!c)return;new Chart(c,{type:'radar',data:{labels:['Reformador','Protector','Constructor','Individualista','Investigador','Precavido','Explorador','Desafiador','Pacificador'],datasets:[{data:[v.IM01,v.IM02,v.IM03,v.IM04,v.IM05,v.IM06,v.IM07,v.IM08,v.IM09],backgroundColor:'rgba(0,212,255,.12)',borderColor:'#00D4FF',pointBackgroundColor:'#7C3AED',borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,scales:{r:{min:0,max:100,pointLabels:{font:{size:10}}}},plugins:{legend:{display:false}}}});}

    function drawBar(ind){const c=document.getElementById('barC');if(!c)return;new Chart(c,{type:'bar',data:{labels:['Autoexigencia','Conexión','Autonomía','Profundidad','Apertura','Seguridad'],datasets:[{data:[ind.autoexigencia,ind.conexion,ind.autonomia,ind.profundidad,ind.apertura,ind.seguridad],backgroundColor:'#7C3AED80',borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{min:0,max:100}}}});}

    function animNum(id,from,to,dur){const el=document.getElementById(id);if(!el)return;const t0=performance.now();(function tick(now){const p=Math.min((now-t0)/dur,1);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);})(t0);}

    // ==================== INIT ====================
    document.addEventListener('DOMContentLoaded', function(){
      makeParticles('ptBg');
      populateIntroDims();
    });