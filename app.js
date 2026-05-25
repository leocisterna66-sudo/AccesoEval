'use strict';

/* ══════════════════════════════════════════════════════════════
   AccesoEval — Lógica principal de la aplicación
   Versión: 1.0 MVP  |  Bilingüe ES / FR
══════════════════════════════════════════════════════════════ */

// ══════════════════════════════════════════════════════════════
//  ★ CONFIGURACIÓN DEL ADMINISTRADOR — Editar solo estas líneas
//
//  Para activar OnlyOffice DocSpace para TODOS los docentes:
//  1. Crea una cuenta en https://www.onlyoffice.com/docspace-registration.aspx
//  2. Ve a Ajustes → Developer Tools → API Keys → Crear clave
//  3. Copia la URL de tu portal y la clave API y pégalas aquí
//  4. En Developer Tools → JavaScript SDK, agrega el dominio de la app
//
//  Dejar en blanco ("") para desactivar la integración.
// ══════════════════════════════════════════════════════════════
const OO_CONFIG = {
  portalUrl: '',   // ← pegar URL del portal (ej: https://miescuela.onlyoffice.io)
  apiToken:  '',   // ← pegar API Key generada en Developer Tools
};
// ══════════════════════════════════════════════════════════════
// FIN DE CONFIGURACIÓN DEL ADMINISTRADOR

// ─────────────────────────────────────────────────────────────
// 1. TRADUCCIONES (i18n)
// ─────────────────────────────────────────────────────────────
const i18n = {
  es: {
    appName: 'AccesoEval',
    tagline: 'Evaluación Inclusiva Inteligente',
    taglineSub: 'Herramienta de revisión pedagógica para adecuaciones de acceso basada en el DUA',
    startBtn: 'Comenzar',
    badge1: 'Basado en DUA', badge2: 'Accesibilidad Cognitiva',
    badge3: 'Evaluación Diferenciada', badge4: 'NEE',
    back: 'Volver',
    loginTitle: 'Iniciar sesión',
    loginSub: 'Ingresa con tu correo institucional',
    emailLabel: 'Correo institucional',
    passLabel: 'Contraseña',
    loginBtn: 'Ingresar →',
    loginLink: '¿Primera vez? Crear cuenta',
    loginDesc: 'Herramienta pedagógica para la revisión inclusiva de evaluaciones escritas, basada en el Diseño Universal para el Aprendizaje.',
    loginFeatures: [
      'Análisis automático de accesibilidad',
      '3 categorías de adecuación de acceso',
      'Editor interactivo con sugerencias',
      'Bilingüe: Español / Français',
      'Basado en evidencia científica'
    ],
    demoHint: '💡 Demo: <strong>docente@escuela.cl</strong> / <strong>1234</strong>',
    errEmail: 'Correo no encontrado en la base de datos',
    errPass: 'Contraseña incorrecta',
    helpBtn: '? Ayuda',
    welcomeMsg: name => `Bienvenido/a, ${name}`,
    welcomeSub: 'Selecciona o carga una prueba para comenzar el análisis inclusivo',
    scopeTitle: 'Revisión inclusiva de acceso',
    scopeDesc: 'Detecta oportunidades de mejora en comprensión lectora, velocidad de procesamiento y ansiedad evaluativa.',
    scopeRule1: 'Accesibilidad y claridad lingüística',
    scopeRule2: 'Formato visual y carga cognitiva',
    scopeRule3: 'No altera objetivos, contenidos ni nivel cognitivo',
    teacherCard: 'Información del docente',
    lblNombre: 'Docente', lblAsignatura: 'Asignatura',
    lblCursos: 'Cursos', lblNivel: 'Nivel',
    uploadTitle: 'Cargar prueba escrita',
    uploadDesc: 'Sube el documento Word (.docx) de la prueba que deseas revisar',
    uploadBtn: 'Seleccionar archivo .docx',
    uploadDrop: 'o arrastra el archivo aquí',
    uploadFormats: 'Formatos: .docx — Máx. 10 MB',
    analyzeBtn: 'Analizar prueba',
    analyzeTextBtn: 'Analizar texto pegado',
    pasteLabel: 'O pega el texto de la prueba',
    pastePlaceholder: 'Pega aquí instrucciones, preguntas o secciones de una prueba escrita...',
    wordCounter: n => `${n} ${n === 1 ? 'palabra' : 'palabras'}`,
    demoBtn: 'Demo rápida',
    recentTitle: 'Pruebas recientes',
    recent1Meta: 'Hace 2 días — 5°A', recent1Tag: '6 sugerencias',
    recent2Meta: 'Hace 5 días — 6°A', recent2Tag: '3 sugerencias',
    analyzingTitle: 'Analizando prueba...',
    analyzingDesc: 'El sistema está revisando el documento con criterios pedagógicos inclusivos',
    step1: 'Leyendo documento',
    step2: 'Identificando criterios DUA',
    step3: 'Detectando oportunidades de mejora',
    step4: 'Generando sugerencias pedagógicas',
    step5: 'Preparando editor interactivo',
    editorTitle: 'Editor de adecuaciones',
    tabSuggestions: 'Sugerencias',
    tabReport: 'Informe',
    tabLegend: 'Leyenda',
    legendIntro: 'Cada color representa una categoría. Las sugerencias NO modifican los objetivos de aprendizaje.',
    legCL: 'Comprensión Lectora',
    legCLDesc: 'Vocabulario técnico sin definir, instrucciones complejas o ambiguas que dificultan el acceso al contenido evaluado.',
    legVP: 'Velocidad de Procesamiento',
    legVPDesc: 'Instrucciones en bloque, formato denso y exceso de información simultánea que generan sobrecarga cognitiva.',
    legAE: 'Ansiedad Evaluativa',
    legAEDesc: 'Frases restrictivas, advertencias negativas y lenguaje amenazante que elevan el estrés en la evaluación.',
    legNote: 'AccesoEval se basa en el <strong>Diseño Universal para el Aprendizaje (DUA)</strong>, teoría de carga cognitiva y evidencia sobre evaluación diferenciada. <strong>No modifica objetivos de aprendizaje ni nivel cognitivo.</strong>',
    acceptBtn: 'Aceptar', rejectBtn: 'Rechazar',
    acceptedStatus: '✓ Aceptada', rejectedStatus: '✗ Rechazada',
    exportInfo: 'Acepta o rechaza las sugerencias y exporta el documento adecuado',
    acceptAllBtn: '✓ Aceptar todas',
    exportBtn: 'Exportar',
    toastAccepted: 'Sugerencia aceptada y aplicada',
    toastRejected: 'Sugerencia rechazada',
    toastAllAccepted: 'Todas las sugerencias fueron aceptadas',
    toastExporting: 'Preparando documento con adecuaciones...',
    toastExported: '✓ Documento exportado: Evaluacion_5A_ADECUADO.docx',
    toastNoFile: 'Selecciona un archivo .docx primero',
    demoDocName: 'Evaluación_Matemáticas_5A_S2.docx (demo)',
    catCL: 'Comprensión Lectora',
    catVP: 'Velocidad de Procesamiento',
    catAE: 'Ansiedad Evaluativa',
    evidencia: 'Evidencia',
    justificacion: 'Justificación pedagógica',
    // Modal ayuda
    helpTitle: 'Guía de uso — AccesoEval',
    modalCatTitle: 'Categorías de análisis',
    modalCL: 'Comprensión Lectora',
    modalCLDesc: 'Detecta vocabulario técnico sin definir, instrucciones complejas y estructuras gramaticales que dificultan la comprensión para estudiantes con NEE de lectura.',
    modalVP: 'Velocidad de Procesamiento',
    modalVPDesc: 'Identifica exceso de información por ítem, formato denso sin descansos visuales y elementos que generan sobrecarga cognitiva.',
    modalAE: 'Ansiedad Evaluativa',
    modalAEDesc: 'Señala frases de advertencia negativas, lenguaje amenazante y restricciones que pueden aumentar el estrés evaluativo.',
    modalHowTitle: '¿Cómo usar el editor?',
    modalHow1: '① Haz clic sobre cualquier <span style="background:var(--cl-bg);border-bottom:2px solid var(--cl-color);padding:0 2px;border-radius:2px">texto subrayado</span> en el documento para activar la sugerencia correspondiente.',
    modalHow2: '② En el panel de sugerencias, revisa la justificación pedagógica y presiona <strong>Aceptar</strong> para aplicar el cambio o <strong>Rechazar</strong> para mantener el original.',
    modalHow3: '③ Los cambios aceptados se muestran con <span class="track-delete">tachado rojo</span> y <span class="track-insert">verde cursiva</span>, al estilo control de cambios.',
    modalNote: '<strong>⚠️ Importante:</strong> AccesoEval <strong>NO</strong> modifica los objetivos de aprendizaje, contenidos curriculares ni el nivel cognitivo de la evaluación. Solo sugiere mejoras en accesibilidad, claridad lingüística y formato visual, respetando el DUA.',
    modalClose: 'Entendido — Comenzar revisión ✓',
  },

  fr: {
    appName: 'AccèsÉval',
    tagline: 'Évaluation Inclusive Intelligente',
    taglineSub: 'Outil de révision pédagogique pour les adaptations d\'accès basé sur la CUA',
    startBtn: 'Commencer',
    badge1: 'Basé sur la CUA', badge2: 'Accessibilité Cognitive',
    badge3: 'Évaluation Différenciée', badge4: 'BEP',
    back: 'Retour',
    loginTitle: 'Se connecter',
    loginSub: 'Connectez-vous avec votre email institutionnel',
    emailLabel: 'Email institutionnel',
    passLabel: 'Mot de passe',
    loginBtn: 'Se connecter →',
    loginLink: 'Première fois ? Créer un compte',
    loginDesc: 'Outil pédagogique pour la révision inclusive des évaluations écrites, basé sur la Conception Universelle de l\'Apprentissage.',
    loginFeatures: [
      'Analyse automatique d\'accessibilité',
      '3 catégories d\'adaptation d\'accès',
      'Éditeur interactif avec suggestions',
      'Bilingue: Español / Français',
      'Basé sur des preuves scientifiques'
    ],
    demoHint: '💡 Démo: <strong>docente@escuela.cl</strong> / <strong>1234</strong>',
    errEmail: 'Email non trouvé dans la base de données',
    errPass: 'Mot de passe incorrect',
    helpBtn: '? Aide',
    welcomeMsg: name => `Bienvenue, ${name}`,
    welcomeSub: 'Sélectionnez ou chargez une épreuve pour commencer l\'analyse inclusive',
    scopeTitle: 'Révision inclusive d\'accès',
    scopeDesc: 'Détecte les possibilités d\'amélioration en compréhension écrite, vitesse de traitement et anxiété évaluative.',
    scopeRule1: 'Accessibilité et clarté linguistique',
    scopeRule2: 'Format visuel et charge cognitive',
    scopeRule3: 'Ne modifie pas les objectifs, contenus ni le niveau cognitif',
    teacherCard: 'Informations de l\'enseignant',
    lblNombre: 'Enseignant', lblAsignatura: 'Matière',
    lblCursos: 'Classes', lblNivel: 'Niveau',
    uploadTitle: 'Charger une épreuve écrite',
    uploadDesc: 'Téléchargez le document Word (.docx) de l\'épreuve à réviser',
    uploadBtn: 'Sélectionner un fichier .docx',
    uploadDrop: 'ou glissez le fichier ici',
    uploadFormats: 'Formats: .docx — Max. 10 Mo',
    analyzeBtn: 'Analyser l\'épreuve',
    analyzeTextBtn: 'Analyser le texte collé',
    pasteLabel: 'Ou collez le texte de l\'épreuve',
    pastePlaceholder: 'Collez ici les consignes, questions ou sections d\'une épreuve écrite...',
    wordCounter: n => `${n} ${n === 1 ? 'mot' : 'mots'}`,
    demoBtn: 'Démo rapide',
    recentTitle: 'Épreuves récentes',
    recent1Meta: 'Il y a 2 jours — 5°A', recent1Tag: '6 suggestions',
    recent2Meta: 'Il y a 5 jours — 6°A', recent2Tag: '3 suggestions',
    analyzingTitle: 'Analyse en cours...',
    analyzingDesc: 'Le système examine le document avec des critères pédagogiques inclusifs',
    step1: 'Lecture du document',
    step2: 'Identification des critères CUA',
    step3: 'Détection des opportunités d\'amélioration',
    step4: 'Génération des suggestions pédagogiques',
    step5: 'Préparation de l\'éditeur interactif',
    editorTitle: 'Éditeur d\'adaptations',
    tabSuggestions: 'Suggestions',
    tabReport: 'Rapport',
    tabLegend: 'Légende',
    legendIntro: 'Chaque couleur représente une catégorie. Les suggestions NE modifient PAS les objectifs d\'apprentissage.',
    legCL: 'Compréhension en Lecture',
    legCLDesc: 'Vocabulaire technique non défini, consignes complexes ou ambiguës qui rendent l\'accès au contenu difficile.',
    legVP: 'Vitesse de Traitement',
    legVPDesc: 'Consignes en bloc, format dense et excès d\'informations simultanées générant une surcharge cognitive.',
    legAE: 'Anxiété Évaluative',
    legAEDesc: 'Phrases restrictives, avertissements négatifs et langage menaçant qui augmentent le stress évaluatif.',
    legNote: 'AccèsÉval est basé sur la <strong>Conception Universelle de l\'Apprentissage (CUA)</strong>, la théorie de la charge cognitive et l\'évaluation différenciée. <strong>Ne modifie pas les objectifs ni le niveau cognitif.</strong>',
    acceptBtn: 'Accepter', rejectBtn: 'Refuser',
    acceptedStatus: '✓ Acceptée', rejectedStatus: '✗ Refusée',
    exportInfo: 'Acceptez ou refusez les suggestions, puis exportez le document adapté',
    acceptAllBtn: '✓ Tout accepter',
    exportBtn: 'Exporter',
    toastAccepted: 'Suggestion acceptée et appliquée',
    toastRejected: 'Suggestion refusée',
    toastAllAccepted: 'Toutes les suggestions ont été acceptées',
    toastExporting: 'Préparation du document avec les adaptations...',
    toastExported: '✓ Document exporté: Evaluation_5A_ADAPTE.docx',
    toastNoFile: 'Sélectionnez d\'abord un fichier .docx',
    demoDocName: 'Evaluación_Matemáticas_5A_S2.docx (démo)',
    catCL: 'Compréhension en Lecture',
    catVP: 'Vitesse de Traitement',
    catAE: 'Anxiété Évaluative',
    evidencia: 'Évidence',
    justificacion: 'Justification pédagogique',
    helpTitle: 'Guide d\'utilisation — AccèsÉval',
    modalCatTitle: 'Catégories d\'analyse',
    modalCL: 'Compréhension en Lecture',
    modalCLDesc: 'Détecte le vocabulaire technique non défini, les consignes complexes et les structures grammaticales difficiles pour les élèves à BEP de lecture.',
    modalVP: 'Vitesse de Traitement',
    modalVPDesc: 'Identifie l\'excès d\'informations par item, le format dense sans pauses visuelles et les éléments qui génèrent une surcharge cognitive.',
    modalAE: 'Anxiété Évaluative',
    modalAEDesc: 'Signale les phrases d\'avertissement négatives, le langage menaçant et les restrictions pouvant augmenter le stress évaluatif.',
    modalHowTitle: 'Comment utiliser l\'éditeur ?',
    modalHow1: '① Cliquez sur un <span style="background:var(--cl-bg);border-bottom:2px solid var(--cl-color);padding:0 2px;border-radius:2px">texte souligné</span> dans le document pour activer la suggestion correspondante.',
    modalHow2: '② Dans le panneau de suggestions, consultez la justification pédagogique et appuyez sur <strong>Accepter</strong> ou <strong>Refuser</strong>.',
    modalHow3: '③ Les modifications acceptées s\'affichent avec <span class="track-delete">barré rouge</span> et <span class="track-insert">vert italique</span>, comme un suivi des modifications.',
    modalNote: '<strong>⚠️ Important:</strong> AccèsÉval <strong>NE</strong> modifie <strong>PAS</strong> les objectifs d\'apprentissage, le contenu ni le niveau cognitif. Il suggère uniquement des améliorations d\'accessibilité, clarté et format, dans le respect de la CUA.',
    modalClose: 'Compris — Commencer la révision ✓',
  }
};

// ─────────────────────────────────────────────────────────────
// 2. BASE DE DATOS (MOCK — sustituir por BD real)
// ─────────────────────────────────────────────────────────────
const MOCK_DB = {
  'docente@escuela.cl': {
    password: '1234',
    nombre: 'María González Rojas',
    asignatura: 'Matemáticas',
    cursos: ['5°A', '5°B', '6°A'],
    nivel: 'Educación Básica',
    colegio: 'Escuela Patrimonial California',
    initials: 'MG'
  },
  'carlos.morales@escuela.cl': {
    password: '1234',
    nombre: 'Carlos Morales Pérez',
    asignatura: 'Lenguaje y Comunicación',
    cursos: ['7°A', '7°B', '8°A'],
    nivel: 'Educación Básica',
    colegio: 'Escuela Patrimonial California',
    initials: 'CM'
  },
  'ana.silva@colegio.cl': {
    password: '1234',
    nombre: 'Ana Silva Muñoz',
    asignatura: 'Ciencias Naturales',
    cursos: ['5°A', '6°B'],
    nivel: 'Educación Básica',
    colegio: 'Colegio Los Andes',
    initials: 'AS'
  }
};

// ─────────────────────────────────────────────────────────────
// 3. SUGERENCIAS DE ANÁLISIS
//    (Motor de demo — en producción sustituir por matrices
//     pedagógicas cargadas desde archivo JSON externo)
// ─────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  {
    id: 'sug_01',
    cat: 'ae',
    highlightId: 'h1',
    subcategoria: {
      es: 'Lenguaje restrictivo-amenazante',
      fr: 'Langage restrictif-menaçant'
    },
    criterio: {
      es: 'Restricciones y advertencias de sanción presentadas como amenaza en las instrucciones generales',
      fr: 'Restrictions et avertissements de sanction présentés comme une menace dans les consignes générales'
    },
    sugerencia: {
      es: 'Reformular en positivo: "Responde con lápiz pasta azul o negro. Si tienes dudas sobre el material, consulta al docente."',
      fr: 'Reformuler positivement: "Réponds avec un stylo bleu ou noir. En cas de doute sur le matériel, consulte l\'enseignant."'
    },
    justificacion: {
      es: 'El DUA (Principio III, Pauta 7) y la investigación en evaluación diferenciada (Cassady & Johnson, 2002) indican que el lenguaje prohibitivo y las referencias a sanciones elevan el cortisol y reducen el rendimiento cognitivo en estudiantes con ansiedad evaluativa.',
      fr: 'La CUA (Principe III, Ligne 7) et la recherche en évaluation différenciée (Cassady & Johnson, 2002) montrent que le langage prohibitif et les références aux sanctions élèvent le cortisol et réduisent les performances cognitives.'
    },
    evidencia: 'Alta',
    replacement: {
      es: 'Responde con lápiz pasta azul o negro. Si tienes dudas sobre el material, consulta al docente.',
      fr: 'Réponds avec un stylo bleu ou noir. En cas de doute sur le matériel, consulte l\'enseignant.'
    }
  },
  {
    id: 'sug_02',
    cat: 'vp',
    highlightId: 'h2',
    subcategoria: {
      es: 'Instrucción en bloque no segmentada',
      fr: 'Consigne en bloc non segmentée'
    },
    criterio: {
      es: 'Primera instrucción del bloque general presentada como párrafo continuo sin apoyo visual ni estructura de pasos',
      fr: 'Première consigne du bloc général présentée comme paragraphe continu sans support visuel ni structure en étapes'
    },
    sugerencia: {
      es: 'Convertir las instrucciones en lista numerada o con viñetas, una por línea. Agregar: "Instrucciones: 1. Lee cada pregunta con calma. 2. Responde con lápiz pasta. 3. Revisa al final."',
      fr: 'Convertir les consignes en liste numérotée, une par ligne: "Consignes: 1. Lis chaque question calmement. 2. Réponds avec un stylo. 3. Vérifie à la fin."'
    },
    justificacion: {
      es: 'La teoría de la carga cognitiva (Sweller, 1988) y las pautas DUA 2.0 recomiendan fragmentar la información en unidades discretas. La estructura visual en lista reduce la carga de memoria de trabajo para estudiantes con dificultades de procesamiento.',
      fr: 'La théorie de la charge cognitive (Sweller, 1988) et les lignes directrices CUA 2.0 recommandent de fragmenter l\'information en unités discrètes pour réduire la charge de mémoire de travail.'
    },
    evidencia: 'Alta',
    replacement: {
      es: 'Lee cada pregunta con calma antes de responder.',
      fr: 'Lis chaque question calmement avant de répondre.'
    }
  },
  {
    id: 'sug_03',
    cat: 'cl',
    highlightId: 'h3',
    subcategoria: {
      es: 'Vocabulario técnico sin contextualizar',
      fr: 'Vocabulaire technique non contextualisé'
    },
    criterio: {
      es: 'Cadena de cuatro términos técnicos consecutivos sin definición ni ejemplo: "orden jerárquico", "operaciones fundamentales", "precedencia", "adición y sustracción"',
      fr: 'Chaîne de quatre termes techniques consécutifs sans définition ni exemple'
    },
    sugerencia: {
      es: 'Simplificar: "...siguiendo el orden de operaciones: primero × y ÷, luego + y −" y agregar un ejemplo resuelto entre paréntesis.',
      fr: 'Simplifier: "...en suivant l\'ordre des opérations: d\'abord × et ÷, puis + et −" et ajouter un exemple résolu.'
    },
    justificacion: {
      es: 'El DUA (Pauta 2.1) recomienda clarificar vocabulario y símbolos. El metalenguaje pedagógico acumulado actúa como barrera de acceso al contenido evaluado, especialmente para estudiantes con dislexia o TDA (CAST, 2018).',
      fr: 'La CUA (Ligne directrice 2.1) recommande de clarifier le vocabulaire. Le métalangage pédagogique accumulé constitue une barrière d\'accès, notamment pour les élèves avec dyslexie ou TDA (CAST, 2018).'
    },
    evidencia: 'Muy alta',
    replacement: {
      es: ' siguiendo el orden de operaciones: primero × y ÷, luego + y −',
      fr: ' en suivant l\'ordre des opérations: d\'abord × et ÷, puis + et −'
    }
  },
  {
    id: 'sug_04',
    cat: 'ae',
    highlightId: 'h4',
    subcategoria: {
      es: 'Consecuencia negativa explícita',
      fr: 'Conséquence négative explicite'
    },
    criterio: {
      es: 'Advertencia de invalidación de respuesta formulada como amenaza condicional: "de lo contrario la respuesta no será válida"',
      fr: 'Avertissement d\'invalidation formulé comme menace conditionnelle: "sinon la réponse ne sera pas valide"'
    },
    sugerencia: {
      es: 'Reformular en positivo: "Muestra tu procedimiento paso a paso. Esto te permite obtener puntaje parcial aunque el resultado final no sea correcto."',
      fr: 'Reformuler positivement: "Montre ta démarche pas à pas. Cela te permet d\'obtenir des points partiels même si le résultat final n\'est pas correct."'
    },
    justificacion: {
      es: 'La investigación sobre evaluación diferenciada (Ketterlin-Geller, 2008) muestra que las advertencias de invalidación generan respuestas de estrés que interfieren con la memoria de trabajo. Reformular en positivo orienta la conducta sin activar el sistema de amenaza.',
      fr: 'La recherche sur l\'évaluation différenciée (Ketterlin-Geller, 2008) montre que les avertissements d\'invalidation génèrent des réponses au stress qui interfèrent avec la mémoire de travail.'
    },
    evidencia: 'Alta',
    replacement: {
      es: ' Muestra tu procedimiento paso a paso. Esto te permite obtener puntaje parcial aunque el resultado final no sea correcto.',
      fr: ' Montre ta démarche pas à pas. Cela te permet d\'obtenir des points partiels même si le résultat final n\'est pas correct.'
    }
  },
  {
    id: 'sug_05',
    cat: 'vp',
    highlightId: 'h5',
    subcategoria: {
      es: 'Comunicación del tiempo sin estrategia de gestión',
      fr: 'Communication du temps sans stratégie de gestion'
    },
    criterio: {
      es: 'Tiempo total informado sin desglose por sección, lo que dificulta la planificación autónoma del tiempo para estudiantes con lentitud de procesamiento',
      fr: 'Temps total indiqué sans répartition par section, ce qui rend la planification autonome difficile'
    },
    sugerencia: {
      es: 'Agregar distribución sugerida: "Tiempo total: 90 min. (Ítem 1: 25 min. | Ítem 2: 25 min. | Ítem 3: 30 min. | Revisión: 10 min.)"',
      fr: 'Ajouter la répartition suggérée: "Temps total: 90 min. (Item 1: 25 min. | Item 2: 25 min. | Item 3: 30 min. | Révision: 10 min.)"'
    },
    justificacion: {
      es: 'Las adecuaciones de acceso (MINEDUC, 2016) para estudiantes con lentitud de procesamiento incluyen proporcionar orientación temporal por sección. Esto reduce la ansiedad y mejora la autorregulación del tiempo disponible.',
      fr: 'Les adaptations d\'accès (MINEDUC, 2016) pour les élèves à faible vitesse de traitement incluent une orientation temporelle par section, réduisant l\'anxiété et améliorant l\'autorégulation.'
    },
    evidencia: 'Alta',
    replacement: {
      es: ' Tiempo total: 90 min. (Ítem 1: 25 min. | Ítem 2: 25 min. | Ítem 3: 30 min. | Revisión: 10 min.)',
      fr: ' Temps total: 90 min. (Item 1: 25 min. | Item 2: 25 min. | Item 3: 30 min. | Révision: 10 min.)'
    }
  },
  {
    id: 'sug_06',
    cat: 'cl',
    highlightId: 'h6',
    subcategoria: {
      es: 'Metalenguaje pedagógico como barrera de acceso',
      fr: 'Métalangage pédagogique comme barrière d\'accès'
    },
    criterio: {
      es: 'La instrucción usa metalenguaje pedagógico especializado ("manejo conceptual y procedimental", "fracciones heterogéneas") no accesible para todos los estudiantes',
      fr: 'La consigne utilise un métalangage pédagogique spécialisé non accessible à tous les élèves'
    },
    sugerencia: {
      es: 'Simplificar: "Resuelve los siguientes problemas con fracciones." Usar lenguaje cotidiano para la instrucción, reservando el lenguaje técnico para los ítems mismos.',
      fr: 'Simplifier: "Résous les problèmes suivants avec des fractions." Utiliser le langage courant pour la consigne.'
    },
    justificacion: {
      es: 'El DUA (Pauta 2.1) recomienda clarificar el vocabulario. El metalenguaje en instrucciones actúa como barrera de acceso independiente del contenido matemático evaluado, creando una doble demanda cognitiva innecesaria (CAST, 2018).',
      fr: 'La CUA (Ligne directrice 2.1) recommande de clarifier le vocabulaire. Le métalangage dans les consignes crée une double demande cognitive inutile (CAST, 2018).'
    },
    evidencia: 'Muy alta',
    replacement: {
      es: ' problemas con fracciones',
      fr: ' problèmes avec des fractions'
    }
  }
];

// ─────────────────────────────────────────────────────────────
// 4. ESTADO DE LA APLICACIÓN
// ─────────────────────────────────────────────────────────────
const state = {
  lang:              'es',
  user:              null,
  fileName:          null,
  file:              null,
  isDemo:            true,
  fileText:          null,
  fileParrafos:      [],
  fileHtml:          '',
  fileHasTables:     false,
  fileBuffer:        null,   // ArrayBuffer original para docx-preview
  sourceMode:        'demo', // demo | file | text
  demoDocumentHtml:  '',
  // ── OnlyOffice DocSpace ─────────────────────────────────
  ooUrl:             null,   // URL del portal DocSpace (ej: https://x.onlyoffice.io)
  ooToken:           null,   // Token de autenticación
  ooEmail:           null,   // Email del usuario conectado
  ooFolderId:        null,   // ID de la carpeta "My Documents" en DocSpace
  ooFileId:          null,   // ID del archivo subido a DocSpace
  ooViewerActive:    false,  // Si el visor de OnlyOffice está activo
  // ── Análisis ───────────────────────────────────────────
  analysisResults:   [],
  statuses:          {},   // { sugId: 'accepted' | 'rejected' }
  customSugerencias: {},   // { sugId: { hint, reemplazo } }  — ediciones del docente
  originalTexts:     {},   // { sugId: innerHTML original }   — para deshacer
};

// ─────────────────────────────────────────────────────────────
// 5. NAVEGACIÓN
// ─────────────────────────────────────────────────────────────
const SCREENS = ['landing', 'login', 'dashboard', 'analyzing', 'editor'];

function showScreen(id) {
  SCREENS.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.toggle('hidden', s !== id);
  });
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────────────────────────
// 6. IDIOMA
// ─────────────────────────────────────────────────────────────
function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;

  // Botones de idioma
  const landingEs = document.getElementById('lang-es');
  const landingFr = document.getElementById('lang-fr');
  if (landingEs) landingEs.classList.toggle('active', lang === 'es');
  if (landingFr) landingFr.classList.toggle('active', lang === 'fr');
  updateLanguageButtons();

  updateTexts();
}

function updateLanguageButtons() {
  document.querySelectorAll('[data-lang-option]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langOption === state.lang);
  });
}

function t(key, ...args) {
  const val = i18n[state.lang][key];
  return typeof val === 'function' ? val(...args) : val;
}

function updateTexts() {
  const L = state.lang;
  const T = i18n[L];

  // Mapa id → clave de traducción (textos simples)
  const textMap = {
    'txt-appName': 'appName',
    'txt-tagline': 'tagline',
    'txt-taglineSub': 'taglineSub',
    'txt-back': 'back',
    'txt-loginTitle': 'loginTitle',
    'txt-loginSub': 'loginSub',
    'txt-emailLabel': 'emailLabel',
    'txt-passLabel': 'passLabel',
    'txt-loginLink': 'loginLink',
    'txt-login-appName': 'appName',
    'txt-login-mobile-logo': 'appName',
    'txt-login-desc': 'loginDesc',
    'txt-dash-logo': 'appName',
    'txt-editor-logo': 'appName',
    'txt-welcomeSub': 'welcomeSub',
    'txt-scope-title': 'scopeTitle',
    'txt-scope-desc': 'scopeDesc',
    'txt-scope-rule1': 'scopeRule1',
    'txt-scope-rule2': 'scopeRule2',
    'txt-scope-rule3': 'scopeRule3',
    'txt-teacherCard': 'teacherCard',
    'lbl-nombre': 'lblNombre',
    'lbl-asignatura': 'lblAsignatura',
    'lbl-cursos': 'lblCursos',
    'lbl-nivel': 'lblNivel',
    'txt-uploadTitle': 'uploadTitle',
    'txt-uploadDesc': 'uploadDesc',
    'txt-pasteLabel': 'pasteLabel',
    'txt-uploadDrop': 'uploadDrop',
    'txt-uploadFormats': 'uploadFormats',
    'txt-recentTitle': 'recentTitle',
    'txt-recent1-meta': 'recent1Meta',
    'txt-recent1-tag': 'recent1Tag',
    'txt-recent2-meta': 'recent2Meta',
    'txt-recent2-tag': 'recent2Tag',
    'txt-analyzingTitle': 'analyzingTitle',
    'txt-analyzingDesc': 'analyzingDesc',
    'txt-step1': 'step1', 'txt-step2': 'step2', 'txt-step3': 'step3',
    'txt-step4': 'step4', 'txt-step5': 'step5',
    'txt-editorTitle': 'editorTitle',
    'txt-legendIntro': 'legendIntro',
    'txt-leg-cl': 'legCL', 'txt-leg-cl-desc': 'legCLDesc',
    'txt-leg-vp': 'legVP', 'txt-leg-vp-desc': 'legVPDesc',
    'txt-leg-ae': 'legAE', 'txt-leg-ae-desc': 'legAEDesc',
    'txt-exportInfo': 'exportInfo',
    'txt-exportBtn': 'exportBtn',
    'txt-helpTitle': 'helpTitle',
    'txt-modal-catTitle': 'modalCatTitle',
    'txt-modal-cl': 'modalCL', 'txt-modal-cl-desc': 'modalCLDesc',
    'txt-modal-vp': 'modalVP', 'txt-modal-vp-desc': 'modalVPDesc',
    'txt-modal-ae': 'modalAE', 'txt-modal-ae-desc': 'modalAEDesc',
    'txt-modal-howTitle': 'modalHowTitle',
    'txt-modal-close': 'modalClose',
  };

  Object.entries(textMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && T[key] !== undefined) el.textContent = T[key];
  });

  // Textos con HTML
  const htmlMap = {
    'txt-demoHint': 'demoHint',
    'txt-modal-how1': 'modalHow1',
    'txt-modal-how2': 'modalHow2',
    'txt-modal-how3': 'modalHow3',
    'txt-modal-note': 'modalNote',
    'txt-leg-note': 'legNote',
  };
  Object.entries(htmlMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && T[key]) el.innerHTML = T[key];
  });

  // Botones con span interno
  const btnSpanMap = {
    'txt-startBtn': 'startBtn',
    'txt-loginBtn': 'loginBtn',
    'txt-uploadBtn': 'uploadBtn',
    'txt-analyzeBtn': 'analyzeBtn',
    'txt-analyzeTextBtn': 'analyzeTextBtn',
    'txt-demoBtn': 'demoBtn',
    'txt-tabSuggestions': 'tabSuggestions',
    'txt-tabReport': 'tabReport',
    'txt-tabLegend': 'tabLegend',
    'txt-acceptAllBtn': 'acceptAllBtn',
    'txt-dash-helpBtn': 'helpBtn',
    'txt-editor-helpBtn': 'helpBtn',
  };
  Object.entries(btnSpanMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && T[key]) el.textContent = T[key];
  });

  const pasteInput = document.getElementById('paste-input');
  if (pasteInput) pasteInput.placeholder = T.pastePlaceholder;
  updateLanguageButtons();
  updatePasteCounter();

  // Badges
  ['badge1','badge2','badge3','badge4'].forEach(k => {
    const el = document.getElementById(`txt-${k}`);
    if (el) el.textContent = T[k];
  });

  // Features list en login
  const featuresList = document.getElementById('login-features-list');
  if (featuresList && T.loginFeatures) {
    featuresList.innerHTML = T.loginFeatures
      .map(f => `<li>${f}</li>`).join('');
  }

  // Errores de formulario
  const errEmail = document.getElementById('err-email');
  const errPass  = document.getElementById('err-pass');
  if (errEmail) errEmail.textContent = T.errEmail;
  if (errPass)  errPass.textContent  = T.errPass;

  // Nombre de usuario en header si hay sesión
  if (state.user) {
    updateUserHeaders();
  }

  // Re-renderizar sugerencias si el editor está visible
  if (!document.getElementById('screen-editor').classList.contains('hidden')) {
    if (state.sourceMode === 'demo') {
      renderSuggestions();
      updateSummaryBar();
    } else {
      renderMatrixResults(state.analysisResults);
      updateSummaryBarReal(state.analysisResults || []);
      const acceptAllBtn = document.getElementById('txt-acceptAllBtn');
      const exportInfo = document.getElementById('txt-exportInfo');
      if (acceptAllBtn) acceptAllBtn.classList.add('hidden');
      if (exportInfo) {
        exportInfo.textContent = state.lang === 'es'
          ? 'Revisa los hallazgos y exporta un informe pedagógico de accesibilidad'
          : 'Révisez les constats et exportez un rapport pédagogique d’accessibilité';
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────
// 7. ACCESO DIRECTO (sin contraseña)
// ─────────────────────────────────────────────────────────────
const USUARIO_INVITADO = {
  nombre:     'Docente',
  asignatura: '—',
  cursos:     ['—'],
  nivel:      '—',
  colegio:    '',
  initials:   'D',
  email:      'invitado',
};

function entrarDirecto() {
  state.user = { ...USUARIO_INVITADO };
  populateDashboard(state.user);
  showScreen('dashboard');
  showToast(t('welcomeMsg', 'docente') + ' 👋', 'success');
}

// Dejado por compatibilidad interna — ya no se usa en el flujo
function initLoginForm() {}
function handleLogin(e) { if(e) e.preventDefault(); }

// ─────────────────────────────────────────────────────────────
// 8. DASHBOARD
// ─────────────────────────────────────────────────────────────
function populateDashboard(user) {
  document.getElementById('info-nombre').textContent     = user.nombre;
  document.getElementById('info-asignatura').textContent = user.asignatura;
  document.getElementById('info-cursos').textContent     = user.cursos.join(', ');
  document.getElementById('info-nivel').textContent      = user.nivel;
  document.getElementById('dash-welcome-msg').textContent = t('welcomeMsg', user.nombre.split(' ')[0]);
  updateUserHeaders();
}

function updateUserHeaders() {
  if (!state.user) return;
  const u = state.user;
  ['dash-user-name', 'editor-user-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = u.nombre.split(' ').slice(0, 2).join(' ');
  });
  ['dash-user-subject'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = u.asignatura;
  });
  ['dash-user-avatar', 'editor-user-avatar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = u.initials;
  });
}

function handleFileSelect(file) {
  if (!file) return;
  state.fileName = file.name;
  state.file         = file;
  state.isDemo       = false;
  state.sourceMode   = 'file';
  state.fileText     = null;
  state.fileParrafos = [];
  state.fileHtml     = '';
  state.fileHasTables = false;
  state.ooFileId      = null;  // resetear embed anterior
  state.ooViewerActive = false;
  // Habilitar botón de subir a DocSpace si hay sesión OnlyOffice
  const btnOo = document.getElementById('btn-oo-upload');
  if (btnOo && state.ooToken) btnOo.disabled = false;
  const size = (file.size / 1024).toFixed(0) + ' KB';

  document.getElementById('upload-zone').classList.add('hidden');
  const info = document.getElementById('file-selected-info');
  info.classList.remove('hidden');
  document.getElementById('file-name-display').textContent = file.name;
  document.getElementById('file-size-display').textContent = size;
  document.getElementById('btn-analyze').disabled = false;
}

function clearFile() {
  state.fileName = null;
  state.file = null;
  state.sourceMode = 'demo';
  state.fileHtml = '';
  state.fileHasTables = false;
  state.ooFileId = null;
  state.ooViewerActive = false;
  document.getElementById('file-input').value = '';
  document.getElementById('upload-zone').classList.remove('hidden');
  document.getElementById('file-selected-info').classList.add('hidden');
  document.getElementById('btn-analyze').disabled = true;
}

function loadDemoAndAnalyze() {
  state.fileName = t('demoDocName');
  state.file   = null;
  state.isDemo = true;
  state.sourceMode = 'demo';
  startAnalysis();
}

function getPastedText() {
  const input = document.getElementById('paste-input');
  return input ? input.value.replace(/\r/g, '').trim() : '';
}

function getWordCount(text) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function updatePasteCounter() {
  const counter = document.getElementById('paste-counter');
  const btn = document.getElementById('btn-analyze-text');
  const text = getPastedText();
  const words = getWordCount(text);
  if (counter) counter.textContent = t('wordCounter', words);
  if (btn) btn.disabled = words < 8;
}

function analyzePastedText() {
  const text = getPastedText();
  if (getWordCount(text) < 8) {
    showToast(state.lang === 'es'
      ? 'Pega al menos una instrucción o pregunta para analizar.'
      : 'Collez au moins une consigne ou question à analyser.', 'error');
    return;
  }
  state.fileName = state.lang === 'es' ? 'Texto pegado por docente' : 'Texte collé par l’enseignant';
  state.file = null;
  state.isDemo = false;
  state.sourceMode = 'text';
  state.fileText = text;
  state.fileParrafos = text.split('\n').map(l => l.trim()).filter(Boolean);
  state.fileBuffer = null;
  state.fileHtml = '';
  state.fileHasTables = false;
  startAnalysis();
}

// ─────────────────────────────────────────────────────────────
// 9. ANÁLISIS — ANIMACIÓN DE PASOS
// ─────────────────────────────────────────────────────────────
function startAnalysis() {
  if (!state.fileName) {
    showToast(t('toastNoFile'), 'error');
    return;
  }

  // Reset sugerencias y historial de deshacer
  state.statuses          = {};
  state.originalTexts     = {};
  state.customSugerencias = {};
  state.ooFileId     = state.ooFileId || null; // conservar si viene de OnlyOffice

  showScreen('analyzing');

  // Reset pasos
  for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`step-${i}`);
    const dot  = document.getElementById(`dot-${i}`);
    if (step) step.classList.remove('done', 'active');
    if (dot)  dot.textContent = i;
  }

  const delays = [0, 850, 1700, 2550, 3350];

  delays.forEach((delay, i) => {
    setTimeout(() => {
      // Completar paso anterior
      if (i > 0) {
        const prevStep = document.getElementById(`step-${i}`);
        const prevDot  = document.getElementById(`dot-${i}`);
        if (prevStep) { prevStep.classList.remove('active'); prevStep.classList.add('done'); }
        if (prevDot)  prevDot.textContent = '✓';
      }
      // Activar paso actual
      const currStep = document.getElementById(`step-${i + 1}`);
      if (currStep) currStep.classList.add('active');
    }, delay);
  });

  // Finalizar y mostrar editor
  setTimeout(() => {
    const lastStep = document.getElementById('step-5');
    const lastDot  = document.getElementById('dot-5');
    if (lastStep) { lastStep.classList.remove('active'); lastStep.classList.add('done'); }
    if (lastDot)  lastDot.textContent = '✓';

    setTimeout(async () => {
      showScreen('editor');
      if (state.isDemo || !state.file) {
        if (state.sourceMode === 'text' && state.fileText) {
          state.analysisResults = runMatrixAnalysis(state.fileText, state.fileParrafos);
          initEditorReal();
        } else {
          // Modo demo — comportamiento original
          initEditor();
        }
      } else {
        // Modo real — leer docx y aplicar matriz
        try {
          const { texto, parrafos } = await extractDocxText(state.file);
          state.fileText        = texto;
          state.fileParrafos    = parrafos;
          state.analysisResults = runMatrixAnalysis(texto, parrafos);
          initEditorReal();
        } catch (err) {
          console.error('Error leyendo docx:', err);
          showToast(state.lang === 'es'
            ? 'No se pudo leer el archivo. Mostrando modo demo.'
            : 'Impossible de lire le fichier. Mode démo activé.', 'error');
          initEditor();
        }
      }
    }, 400);
  }, 4400);
}

// ─────────────────────────────────────────────────────────────
// 10. EDITOR INTERACTIVO
// ─────────────────────────────────────────────────────────────
function initEditor() {
  const docContent = document.getElementById('document-content');
  if (docContent && state.demoDocumentHtml) {
    docContent.classList.remove('docx-viewer-mode');
    docContent.innerHTML = state.demoDocumentHtml;
  }

  // Nombre del doc en header
  const docNameEl = document.getElementById('editor-doc-name');
  if (docNameEl) docNameEl.textContent = state.fileName || '—';

  // Resetear highlights y guardar texto original para poder deshacer
  SUGGESTIONS.forEach(s => {
    const el = document.getElementById(s.highlightId);
    if (el) {
      el.className = `highlight ${s.cat}`;
      // Solo guardar la primera vez (no sobreescribir si ya está guardado)
      if (!state.originalTexts[s.id]) {
        state.originalTexts[s.id] = el.innerHTML;
      }
    }
  });

  renderSuggestions();
  updateSummaryBar();
  const acceptAllBtn = document.getElementById('txt-acceptAllBtn');
  const exportInfo = document.getElementById('txt-exportInfo');
  if (acceptAllBtn) acceptAllBtn.classList.remove('hidden');
  if (exportInfo) exportInfo.textContent = t('exportInfo');

  // Delegación de clicks en highlights del documento
  if (docContent) {
    docContent.onclick = function(e) {
      const target = e.target.closest('[data-sug]');
      if (target) activateSuggestion(target.dataset.sug);
    };
  }

  // En primera vez, mostrar ayuda automáticamente
  if (!sessionStorage.getItem('helpShown')) {
    setTimeout(() => showHelp(), 600);
    sessionStorage.setItem('helpShown', '1');
  }
}

function renderSuggestions() {
  const container = document.getElementById('suggestions-list');
  if (!container) return;
  const L = state.lang;
  const T = i18n[L];

  container.innerHTML = SUGGESTIONS.map(s => {
    const status = state.statuses[s.id];
    const isAccepted = status === 'accepted';
    const isRejected = status === 'rejected';

    const statusBadge = isAccepted
      ? `<span class="sug-status accepted">${T.acceptedStatus}</span>`
      : isRejected
        ? `<span class="sug-status rejected">${T.rejectedStatus}</span>`
        : '';

    const actions = (!isAccepted && !isRejected)
      ? `<div class="sug-actions">
           <button class="btn btn-sm btn-accept"
             onclick="event.stopPropagation();acceptSuggestion('${s.id}')">
             ✓ ${T.acceptBtn}
           </button>
           <button class="btn btn-sm btn-reject"
             onclick="event.stopPropagation();rejectSuggestion('${s.id}')">
             ✗ ${T.rejectBtn}
           </button>
         </div>`
      : `<div class="sug-actions" style="margin-top:.4rem">
           <button class="btn btn-sm"
             style="background:transparent;border:1px solid var(--border);color:var(--text-muted);font-size:.72rem"
             onclick="event.stopPropagation();deshacerSugerencia('${s.id}')">
             ↩ ${state.lang==='es'?'Deshacer':'Annuler l\'action'}
           </button>
         </div>`;

    const evBadgeColor = s.evidencia === 'Muy alta' ? '#7C3AED' : '#16A34A';
    const custom       = state.customSugerencias[s.id] || {};
    const hintTexto    = custom.hint     || s.sugerencia[L];
    const replTexto    = custom.reemplazo|| s.replacement[L];
    const fueEditada   = !!custom.hint;

    const editArea = (!isAccepted && !isRejected) ? `
      <div id="edit-area-${s.id}" style="display:none;margin:.5rem 0;border:1px dashed var(--primary);border-radius:6px;padding:.6rem;background:var(--surface)">
        <p style="font-size:.72rem;font-weight:700;color:var(--primary);margin:0 0 .3rem">✏️ ${L==='es'?'Editar sugerencia pedagógica':'Modifier la suggestion pédagogique'}:</p>
        <textarea id="edit-hint-${s.id}" rows="3"
          style="width:100%;box-sizing:border-box;font-size:.78rem;padding:.4rem;border:1px solid var(--border);border-radius:4px;resize:vertical;font-family:inherit;line-height:1.5"
          onclick="event.stopPropagation()">${hintTexto}</textarea>
        <p style="font-size:.72rem;font-weight:700;color:var(--primary);margin:.5rem 0 .25rem">
          ${L==='es'?'Texto que reemplazará en el documento':'Texte de remplacement dans le document'}:
        </p>
        <textarea id="edit-repl-${s.id}" rows="2"
          style="width:100%;box-sizing:border-box;font-size:.78rem;padding:.4rem;border:1px solid var(--border);border-radius:4px;resize:vertical;font-family:inherit;line-height:1.5"
          onclick="event.stopPropagation()">${replTexto}</textarea>
        <div style="display:flex;gap:.5rem;margin-top:.5rem;flex-wrap:wrap">
          <button class="btn btn-sm btn-accept"
            onclick="event.stopPropagation();guardarEdicion('${s.id}')">
            💾 ${L==='es'?'Guardar':'Enregistrer'}
          </button>
          <button class="btn btn-sm btn-reject"
            onclick="event.stopPropagation();cancelarEdicion('${s.id}')">
            ✕ ${L==='es'?'Cancelar':'Annuler'}
          </button>
          ${fueEditada ? `<button class="btn btn-sm"
            style="background:transparent;border:1px solid var(--border);color:var(--text-muted);font-size:.7rem"
            onclick="event.stopPropagation();deshacerEdicion('${s.id}')">
            ↩ ${L==='es'?'Restaurar original':'Restaurer l\'original'}
          </button>` : ''}
        </div>
      </div>` : '';

    const btnEditar = (!isAccepted && !isRejected) ? `
      <button id="btn-edit-${s.id}"
        style="font-size:.7rem;margin-bottom:.5rem;background:transparent;border:1px dashed ${fueEditada?'var(--primary)':'var(--border)'};color:${fueEditada?'var(--primary)':'var(--text-muted)'};padding:2px 8px;border-radius:20px;cursor:pointer"
        onclick="event.stopPropagation();toggleEdicion('${s.id}')">
        ✏️ ${fueEditada?(L==='es'?'Sugerencia modificada ▾':'Suggestion modifiée ▾'):(L==='es'?'Modificar sugerencia':'Modifier la suggestion')}
      </button>` : '';

    return `
      <div class="suggestion-card ${s.cat} ${isAccepted ? 'accepted' : ''} ${isRejected ? 'rejected' : ''}"
           id="card-${s.id}" data-sug="${s.id}"
           onclick="activateSuggestion('${s.id}')">
        ${statusBadge}
        <span class="suggestion-tag ${s.cat}">${s.cat === 'cl' ? T.catCL : s.cat === 'vp' ? T.catVP : T.catAE}</span>
        <span style="font-size:.68rem;background:${evBadgeColor};color:#fff;border-radius:50px;padding:1px 6px;margin-left:4px">
          ${T.evidencia}: ${s.evidencia}
        </span>
        <h4 style="margin-top:.5rem">${s.subcategoria[L]}</h4>
        <p class="sug-text">${s.criterio[L]}</p>
        <div class="sug-hint" id="hint-display-${s.id}">💡 ${hintTexto}</div>
        ${btnEditar}
        ${editArea}
        <details style="margin-bottom:.6rem">
          <summary style="font-size:.72rem;font-weight:700;color:var(--text-muted);cursor:pointer;user-select:none">
            📚 ${T.justificacion}
          </summary>
          <p style="font-size:.75rem;color:var(--text-muted);margin-top:.4rem;line-height:1.55;padding:.5rem;background:var(--surface);border-radius:4px">
            ${s.justificacion[L]}
          </p>
        </details>
        ${actions}
      </div>`;
  }).join('');

  // Actualizar badge de cantidad pendiente
  const pending = SUGGESTIONS.filter(s => !state.statuses[s.id]).length;
  const badge = document.getElementById('sug-badge');
  if (badge) {
    badge.textContent = pending;
    badge.style.background = pending === 0 ? 'var(--success)' : 'var(--primary)';
  }
}

function activateSuggestion(sugId) {
  const sug = SUGGESTIONS.find(s => s.id === sugId);
  if (!sug) return;

  // Desactivar todos
  SUGGESTIONS.forEach(s => {
    const el = document.getElementById(s.highlightId);
    if (el) el.classList.remove('active');
    const card = document.getElementById(`card-${s.id}`);
    if (card) card.classList.remove('active');
  });

  // Activar el seleccionado (si no tiene estado final)
  if (!state.statuses[sugId]) {
    const hl = document.getElementById(sug.highlightId);
    if (hl) {
      hl.classList.add('active');
      hl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  const card = document.getElementById(`card-${sugId}`);
  if (card) {
    card.classList.add('active');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // En móvil, abrir sidebar
  const sidebar = document.getElementById('editor-sidebar');
  if (sidebar && window.innerWidth < 1024) {
    sidebar.classList.add('mobile-open');
    const closeBtn = document.getElementById('sidebar-close-btn');
    if (closeBtn) closeBtn.classList.remove('hidden');
  }

  switchSidebarTab('suggestions');
}

function acceptSuggestion(sugId) {
  const sug = SUGGESTIONS.find(s => s.id === sugId);
  if (!sug || state.statuses[sugId] === 'accepted') return;

  state.statuses[sugId] = 'accepted';
  const L = state.lang;

  const hl = document.getElementById(sug.highlightId);
  if (hl) {
    const originalText = hl.innerText;
    // Usar reemplazo personalizado del docente si existe, si no el original
    const custom      = state.customSugerencias[sug.id] || {};
    const replacement = custom.reemplazo || sug.replacement[L];
    hl.innerHTML =
      `<span class="track-delete">${originalText}</span>` +
      `<span class="track-insert"> ${replacement}</span>`;
    hl.classList.remove('active', 'cl', 'vp', 'ae');
    hl.classList.add('accepted');
  }

  renderSuggestions();
  updateSummaryBar();
  showToast(t('toastAccepted'), 'success');
}

function rejectSuggestion(sugId) {
  const sug = SUGGESTIONS.find(s => s.id === sugId);
  if (!sug || state.statuses[sugId] === 'rejected') return;

  state.statuses[sugId] = 'rejected';

  const hl = document.getElementById(sug.highlightId);
  if (hl) {
    hl.classList.remove('active', 'cl', 'vp', 'ae');
    hl.classList.add('rejected');
  }

  renderSuggestions();
  updateSummaryBar();
  showToast(t('toastRejected'), 'info');
}

// ─────────────────────────────────────────────────────────────
// EDICIÓN DE SUGERENCIAS por el docente
// ─────────────────────────────────────────────────────────────
function toggleEdicion(sugId) {
  const area = document.getElementById(`edit-area-${sugId}`);
  if (!area) return;
  const visible = area.style.display !== 'none';
  area.style.display = visible ? 'none' : 'block';
  if (!visible) {
    // Pre-cargar texto actual al abrir
    const custom  = state.customSugerencias[sugId] || {};
    const sug     = SUGGESTIONS.find(s => s.id === sugId);
    const L       = state.lang;
    const hintEl  = document.getElementById(`edit-hint-${sugId}`);
    const replEl  = document.getElementById(`edit-repl-${sugId}`);
    if (hintEl) hintEl.value = custom.hint      || (sug ? sug.sugerencia[L]  : '');
    if (replEl) replEl.value = custom.reemplazo || (sug ? sug.replacement[L] : '');
    if (hintEl) hintEl.focus();
  }
}

function guardarEdicion(sugId) {
  const hintEl = document.getElementById(`edit-hint-${sugId}`);
  const replEl = document.getElementById(`edit-repl-${sugId}`);
  const hint   = hintEl ? hintEl.value.trim() : '';
  const repl   = replEl ? replEl.value.trim() : '';

  if (!hint) {
    showToast(state.lang === 'es'
      ? 'El texto de sugerencia no puede estar vacío.'
      : 'Le texte de suggestion ne peut pas être vide.', 'error');
    return;
  }

  state.customSugerencias[sugId] = { hint, reemplazo: repl };
  renderSuggestions();           // re-render para reflejar cambios
  showToast(state.lang === 'es'
    ? '✓ Sugerencia actualizada correctamente.'
    : '✓ Suggestion mise à jour.', 'success');
}

function cancelarEdicion(sugId) {
  const area = document.getElementById(`edit-area-${sugId}`);
  if (area) area.style.display = 'none';
}

// ── Deshacer aceptar / rechazar ────────────────────────────
function deshacerSugerencia(sugId) {
  const sug = SUGGESTIONS.find(s => s.id === sugId);
  if (!sug) return;
  const L = state.lang;

  // Restaurar el texto original del highlight en el documento
  const hl = document.getElementById(sug.highlightId);
  if (hl) {
    hl.innerHTML  = state.originalTexts[sugId] || hl.textContent;
    hl.className  = `highlight ${sug.cat}`;
  }

  // Borrar el estado de la sugerencia → vuelve a "pendiente"
  delete state.statuses[sugId];

  renderSuggestions();
  updateSummaryBar();
  showToast(
    L === 'es' ? '↩ Acción deshecha — la sugerencia volvió a pendiente.'
               : '↩ Action annulée — la suggestion est repassée en attente.',
    'info'
  );
}

// ── Deshacer edición personalizada ────────────────────────
function deshacerEdicion(sugId) {
  if (!state.customSugerencias[sugId]) return;
  const L   = state.lang;
  const sug = SUGGESTIONS.find(s => s.id === sugId);

  delete state.customSugerencias[sugId];
  renderSuggestions();
  showToast(
    L === 'es' ? '↩ Sugerencia restaurada al texto original.'
               : '↩ Suggestion restaurée au texte original.',
    'info'
  );
}

function deshacerEdicionReal(id) {
  if (!state.customSugerencias[id]) return;
  const L = state.lang;
  delete state.customSugerencias[id];
  renderMatrixResults(state.analysisResults);
  showToast(
    L === 'es' ? '↩ Sugerencia restaurada al texto original.'
               : '↩ Suggestion restaurée au texte original.',
    'info'
  );
}

function acceptAll() {
  const pending = SUGGESTIONS.filter(s => !state.statuses[s.id]);
  pending.forEach(s => acceptSuggestion(s.id));
  if (pending.length > 0) showToast(t('toastAllAccepted'), 'success');
}

function updateSummaryBar() {
  const counts = { cl: 0, vp: 0, ae: 0 };
  SUGGESTIONS.forEach(s => {
    if (!state.statuses[s.id]) counts[s.cat]++;
  });
  const labels = {
    cl: t('catCL'), vp: t('catVP'), ae: t('catAE')
  };
  Object.entries(counts).forEach(([cat, n]) => {
    const el = document.getElementById(`summary-${cat}`);
    if (el) el.textContent = `● ${labels[cat].split(' ')[0]}: ${n}`;
  });
}

// ─────────────────────────────────────────────────────────────
// 11. TABS DEL SIDEBAR
// ─────────────────────────────────────────────────────────────
function switchSidebarTab(tab) {
  ['suggestions', 'report', 'legend'].forEach(t => {
    const btn  = document.getElementById(`tab-btn-${t}`);
    const body = document.getElementById(`tab-body-${t}`);
    if (btn)  btn.classList.toggle('active', t === tab);
    if (body) body.classList.toggle('hidden', t !== tab);
  });
}

// ─────────────────────────────────────────────────────────────
// 12. SIDEBAR MÓVIL
// ─────────────────────────────────────────────────────────────
function toggleSidebar() {
  const sidebar  = document.getElementById('editor-sidebar');
  const closeBtn = document.getElementById('sidebar-close-btn');
  sidebar.classList.toggle('mobile-open');
  const isOpen = sidebar.classList.contains('mobile-open');
  if (closeBtn) closeBtn.classList.toggle('hidden', !isOpen);
}

function hideSidebar() {
  const sidebar  = document.getElementById('editor-sidebar');
  const closeBtn = document.getElementById('sidebar-close-btn');
  sidebar.classList.remove('mobile-open');
  if (closeBtn) closeBtn.classList.add('hidden');
}

// ─────────────────────────────────────────────────────────────
// 13. EXPORTAR
// ─────────────────────────────────────────────────────────────
function exportDoc() {
  showToast(t('toastExporting'), 'info');
  setTimeout(() => {
    try {
      if (state.isDemo || !state.file) {
        exportarModoDemo();
      } else {
        exportarModoReal();
      }
    } catch(err) {
      console.error('Export error:', err);
      showToast('Error al exportar. Intenta de nuevo.', 'error');
    }
  }, 600);
}

// ── Exportar modo DEMO (evaluación con sugerencias aceptadas) ─
function exportarModoDemo() {
  const L = state.lang;

  // Clonar el contenido del documento para no alterar el original
  const original = document.getElementById('document-content');
  const clone    = original.cloneNode(true);

  // 1. Eliminar texto tachado (sugerencia aceptada → texto viejo va)
  clone.querySelectorAll('.track-delete').forEach(el => el.remove());

  // 2. Convertir texto insertado en texto plano (sugerencia aceptada → texto nuevo queda)
  clone.querySelectorAll('.track-insert').forEach(el => {
    el.replaceWith(document.createTextNode(el.textContent));
  });

  // 3. Quitar destacados de sugerencias pendientes y rechazadas → texto plano
  clone.querySelectorAll('.highlight, [class*="highlight"]').forEach(el => {
    el.replaceWith(document.createTextNode(el.textContent));
  });

  // Estadísticas de revisión
  const aceptadas = Object.values(state.statuses).filter(v => v === 'accepted').length;
  const rechazadas= Object.values(state.statuses).filter(v => v === 'rejected').length;
  const pendientes= SUGGESTIONS.length - aceptadas - rechazadas;
  const fecha     = new Date().toLocaleDateString(L === 'es' ? 'es-CL' : 'fr-FR',
                      { day:'2-digit', month:'long', year:'numeric' });

  const piePagina = `
    <hr style="margin-top:2rem;border:none;border-top:1px solid #ccc">
    <p style="font-size:10pt;color:#666;margin-top:.5rem">
      <strong>AccesoEval</strong> — Revisión de accesibilidad pedagógica basada en DUA &nbsp;|&nbsp;
      Fecha: ${fecha} &nbsp;|&nbsp;
      Sugerencias aceptadas: ${aceptadas} &nbsp;·&nbsp; Rechazadas: ${rechazadas} &nbsp;·&nbsp; Pendientes: ${pendientes}
    </p>`;

  const nombreArchivo = (state.fileName || 'Evaluacion')
    .replace(/\.docx?$/i, '')
    .replace(/[^a-zA-Z0-9_\-]/g, '_');

  descargarComoDoc(
    clone.innerHTML + piePagina,
    `${nombreArchivo}_ADECUADA.docx`,
    L === 'es' ? 'Evaluación Adecuada — AccesoEval' : 'Évaluation Adaptée — AccèsÉval'
  );

  showToast(
    L === 'es'
      ? `✓ Documento descargado: ${nombreArchivo}_ADECUADA.docx`
      : `✓ Document téléchargé: ${nombreArchivo}_ADAPTEE.docx`,
    'success', 5000
  );
}

// ── Exportar modo REAL (informe con hallazgos de la Matriz TPA) ─
function exportarModoReal() {
  const L       = state.lang;
  const results = state.analysisResults || [];
  const fecha   = new Date().toLocaleDateString(L === 'es' ? 'es-CL' : 'fr-FR',
                    { day:'2-digit', month:'long', year:'numeric' });

  const catLabel = {
    cl: L==='es' ? 'Comprensión Lectora'       : 'Compréhension Lecture',
    vp: L==='es' ? 'Velocidad de Procesamiento' : 'Vitesse de Traitement',
    ae: L==='es' ? 'Ansiedad Evaluativa'        : 'Anxiété Évaluative',
  };
  const catColor = { cl:'#1F4E79', vp:'#2E75B6', ae:'#C0390B' };

  const alertas = results.filter(r => r.encontro);
  const ok      = results.filter(r => !r.encontro);

  // ── Portada del informe ──
  let html = `
    <h1 style="color:#1F4E79;font-size:20pt;text-align:center;margin-bottom:4pt">
      ${L==='es' ? 'INFORME DE REVISIÓN TÉCNICO-PEDAGÓGICA' : 'RAPPORT DE RÉVISION TECHNICO-PÉDAGOGIQUE'}
    </h1>
    <p style="text-align:center;color:#595959;font-size:11pt;margin-bottom:16pt">
      AccesoEval — ${L==='es' ? 'Revisión con Matriz de Accesibilidad Evaluativa' : 'Révision avec Matrice d\'Accessibilité Évaluative'}
    </p>
    <table width="100%" style="border-collapse:collapse;margin-bottom:20pt">
      <tr><td style="background:#DEEAF1;padding:6pt 10pt;width:35%;font-weight:bold;border:1px solid #ccc">
          ${L==='es'?'Archivo revisado':'Fichier révisé'}</td>
        <td style="padding:6pt 10pt;border:1px solid #ccc">${state.fileName || '—'}</td></tr>
      <tr><td style="background:#DEEAF1;padding:6pt 10pt;font-weight:bold;border:1px solid #ccc">
          ${L==='es'?'Fecha de revisión':'Date de révision'}</td>
        <td style="padding:6pt 10pt;border:1px solid #ccc">${fecha}</td></tr>
      <tr><td style="background:#DEEAF1;padding:6pt 10pt;font-weight:bold;border:1px solid #ccc">
          ${L==='es'?'Criterios evaluados':'Critères évalués'}</td>
        <td style="padding:6pt 10pt;border:1px solid #ccc">${results.length} criterios — ${alertas.length} con hallazgos / ${ok.length} sin problemas</td></tr>
    </table>`;

  // ── Resumen por categoría ──
  html += `<h2 style="color:#1F4E79;font-size:14pt;border-bottom:2px solid #2E75B6;padding-bottom:4pt">
    ${L==='es'?'RESUMEN EJECUTIVO':'RÉSUMÉ EXÉCUTIF'}</h2>
    <table width="100%" style="border-collapse:collapse;margin-bottom:20pt">
      <tr style="background:#1F4E79;color:#fff">
        <th style="padding:6pt 10pt;text-align:left">Categoría</th>
        <th style="padding:6pt 10pt;text-align:center">Con hallazgos</th>
        <th style="padding:6pt 10pt;text-align:center">Sin problemas</th>
      </tr>`;
  ['cl','vp','ae'].forEach(cat => {
    const con = alertas.filter(r=>r.cat===cat).length;
    const sin = ok.filter(r=>r.cat===cat).length;
    html += `<tr>
      <td style="padding:6pt 10pt;border:1px solid #ccc;font-weight:bold;color:${catColor[cat]}">${catLabel[cat]}</td>
      <td style="padding:6pt 10pt;border:1px solid #ccc;text-align:center;background:${con>0?'#FCE4D6':'#fff'}">${con}</td>
      <td style="padding:6pt 10pt;border:1px solid #ccc;text-align:center;background:${sin>0?'#E2EFDA':'#fff'}">${sin}</td>
    </tr>`;
  });
  html += `</table>`;

  // ── Detalle de hallazgos ──
  if (alertas.length) {
    html += `<h2 style="color:#1F4E79;font-size:14pt;border-bottom:2px solid #2E75B6;padding-bottom:4pt">
      ${L==='es'?'HALLAZGOS DETECTADOS':'CONSTATATIONS DÉTECTÉES'}</h2>`;

    alertas.forEach(r => {
      const c = catColor[r.cat];
      html += `
        <div style="margin-bottom:14pt;border-left:4px solid ${c};padding-left:10pt">
          <p style="margin:0 0 4pt 0">
            <strong style="color:${c};font-size:11pt">Criterio ${r.id} — ${r.nombre[L]}</strong>
            &nbsp;<span style="background:${r.evidencia==='Muy alta'?'#7C3AED':'#16A34A'};color:#fff;font-size:9pt;padding:1pt 6pt;border-radius:20pt">
              ${L==='es'?'Evidencia':'Évidence'}: ${r.evidencia}
            </span>
          </p>
          <ul style="margin:4pt 0 6pt 16pt;padding:0">
            ${r.hallazgos.map(h=>`<li style="margin-bottom:3pt;font-size:10pt">${h}</li>`).join('')}
          </ul>
          <p style="margin:0;font-size:10pt;color:#1F4E79">
            <strong>${L==='es'?'Sugerencia':'Suggestion'}:</strong>
            <em>${state.customSugerencias[r.id]?.hint || r.sugerencia[L]}</em>
            ${state.customSugerencias[r.id]
              ? `<span style="font-size:9pt;color:#7C3AED;font-style:normal"> ✏️ ${L==='es'?'(modificada por docente)':'(modifiée par l\'enseignant)'}</span>`
              : ''}
          </p>
        </div>`;
    });
  }

  // ── Criterios sin problemas ──
  html += `<h2 style="color:#375623;font-size:14pt;border-bottom:2px solid #92D050;padding-bottom:4pt">
    ${L==='es'?'CRITERIOS SIN PROBLEMAS DETECTADOS':'CRITÈRES SANS PROBLÈMES DÉTECTÉS'}</h2>
    <table width="100%" style="border-collapse:collapse;margin-bottom:20pt">`;
  ok.forEach(r => {
    html += `<tr>
      <td style="padding:5pt 10pt;border:1px solid #ccc;color:${catColor[r.cat]};font-weight:bold;width:15%">${r.id}</td>
      <td style="padding:5pt 10pt;border:1px solid #ccc">${r.nombre[L]}</td>
      <td style="padding:5pt 10pt;border:1px solid #ccc;color:#375623;font-weight:bold;text-align:center;width:15%">✓ OK</td>
    </tr>`;
  });
  html += `</table>`;

  // ── Texto original del documento ──
  if (state.fileParrafos && state.fileParrafos.length) {
    html += `<h2 style="color:#1F4E79;font-size:14pt;border-bottom:2px solid #2E75B6;padding-bottom:4pt">
      ${L==='es'?'TEXTO ORIGINAL DEL DOCUMENTO':'TEXTE ORIGINAL DU DOCUMENT'}</h2>`;
    state.fileParrafos.forEach(p => {
      html += `<p style="font-size:10pt;margin:4pt 0;line-height:1.5">${p
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>`;
    });
  }

  // ── Nota metodológica ──
  html += `
    <hr style="margin-top:24pt;border:none;border-top:1px solid #ccc">
    <p style="font-size:9pt;color:#666;margin-top:6pt">
      <strong>AccesoEval</strong> — Revisión automática basada en Matriz Técnico-Pedagógica de Accesibilidad Evaluativa.
      Los criterios se organizan en 3 categorías: Comprensión Lectora (1.1–1.6), Velocidad de Procesamiento (2.1–2.5)
      y Ansiedad Evaluativa (3.1–3.6). Este informe es orientador — el docente debe contextualizar los hallazgos.
      <strong>No modifica objetivos de aprendizaje ni nivel cognitivo.</strong>
    </p>`;

  const nombreBase = state.fileName.replace(/\.docx?$/i,'').replace(/[^a-zA-Z0-9_\-]/g,'_');
  descargarComoDoc(html, `${nombreBase}_INFORME_REVISION.docx`,
    L==='es' ? 'Informe de Revisión — AccesoEval' : 'Rapport de Révision — AccèsÉval');

  showToast(
    L==='es'
      ? `✓ Informe descargado: ${nombreBase}_INFORME_REVISION.docx`
      : `✓ Rapport téléchargé: ${nombreBase}_RAPPORT_REVISION.docx`,
    'success', 5000
  );
}

// ── Motor de descarga Word-compatible ─────────────────────────
function descargarComoDoc(htmlBody, nombreArchivo, titulo) {
  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${titulo}</title>
      <!--[if gte mso 9]>
      <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
      <![endif]-->
      <style>
        body { font-family: Arial, sans-serif; font-size: 11pt; margin: 2cm; color: #222; }
        h1   { font-size: 18pt; }
        h2   { font-size: 13pt; margin-top: 16pt; }
        p    { line-height: 1.5; margin: 4pt 0; }
        table { border-collapse: collapse; width: 100%; }
        td, th { padding: 5pt 8pt; }
      </style>
    </head>
    <body>${htmlBody}</body>
    </html>`;

  const blob = new Blob(['﻿' + wordHtml], {
    type: 'application/msword;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────
// 14. MODAL AYUDA
// ─────────────────────────────────────────────────────────────
function showHelp() {
  document.getElementById('modal-help').classList.remove('hidden');
}

function hideHelp() {
  document.getElementById('modal-help').classList.add('hidden');
}

function handleModalOverlayClick(e) {
  if (e.target.id === 'modal-help') hideHelp();
}

// ─────────────────────────────────────────────────────────────
// 15. TOAST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast${type === 'success' ? ' success' : type === 'error' ? ' error' : ''}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─────────────────────────────────────────────────────────────
// 16. DRAG & DROP en zona de carga
// ─────────────────────────────────────────────────────────────
function initDragDrop() {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('dragover');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      handleFileSelect(file);
    } else {
      showToast(state.lang === 'es' ? 'Solo se aceptan archivos .docx' : 'Seuls les fichiers .docx sont acceptés', 'error');
    }
  });

  // File input change
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', e => handleFileSelect(e.target.files[0]));
  }

  // Clear button
  const clearBtn = document.getElementById('btn-clear-file');
  if (clearBtn) clearBtn.addEventListener('click', clearFile);

  // Analyze button
  const analyzeBtn = document.getElementById('btn-analyze');
  if (analyzeBtn) analyzeBtn.addEventListener('click', startAnalysis);

  const pasteInput = document.getElementById('paste-input');
  const analyzeTextBtn = document.getElementById('btn-analyze-text');
  if (pasteInput) pasteInput.addEventListener('input', updatePasteCounter);
  if (analyzeTextBtn) analyzeTextBtn.addEventListener('click', analyzePastedText);
}

// ══════════════════════════════════════════════════════════════
//  ONLYOFFICE DOCSPACE — Autenticación + Subida + Visor
// ══════════════════════════════════════════════════════════════

// ── Toggle del formulario de conexión ────────────────────────
function toggleOnlyOfficeForm() {
  const panel   = document.getElementById('oo-form-panel');
  const chevron = document.getElementById('oo-chevron');
  if (!panel) return;
  const isOpen = !panel.classList.contains('hidden');
  panel.classList.toggle('hidden', isOpen);
  if (chevron) chevron.textContent = isOpen ? '▾' : '▴';
}

function normalizeOoUrl(url) {
  return (url || '').trim().replace(/\/+$/, '');
}

// ── Login con email + contraseña via API REST ─────────────────
async function loginOnlyOffice() {
  const portalUrl = normalizeOoUrl(document.getElementById('oo-portal-url')?.value);
  const email     = (document.getElementById('oo-email')?.value || '').trim();
  const password  = (document.getElementById('oo-password')?.value || '').trim();
  const L = state.lang;

  if (!portalUrl || !email || !password) {
    showToast(L === 'es'
      ? 'Completa la URL del portal, email y contraseña.'
      : 'Remplis l\'URL du portail, l\'e-mail et le mot de passe.', 'error');
    return;
  }

  const btn  = document.getElementById('btn-oo-connect');
  const span = btn?.querySelector('span');
  if (span) span.textContent = L === 'es' ? 'Conectando…' : 'Connexion…';
  if (btn) btn.disabled = true;

  try {
    const authResp = await fetch(`${portalUrl}/api/2.0/authentication`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ userName: email, password }),
    });
    if (!authResp.ok) {
      const errData = await authResp.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${authResp.status}`);
    }
    const authData = await authResp.json();
    const token    = authData?.response?.token;
    if (!token) throw new Error('No se recibió token del servidor.');

    const folderResp = await fetch(`${portalUrl}/api/2.0/files/@my`, {
      headers: { 'Authorization': token, 'Accept': 'application/json' },
    });
    if (!folderResp.ok) throw new Error(`Error obteniendo carpeta: HTTP ${folderResp.status}`);
    const folderData = await folderResp.json();
    const folderId   = folderData?.response?.current?.id;
    if (!folderId) throw new Error('No se pudo obtener la carpeta de documentos.');

    state.ooUrl      = portalUrl;
    state.ooToken    = token;
    state.ooEmail    = email;
    state.ooFolderId = folderId;

    sessionStorage.setItem('oo_url',      portalUrl);
    sessionStorage.setItem('oo_token',    token);
    sessionStorage.setItem('oo_email',    email);
    sessionStorage.setItem('oo_folderid', String(folderId));

    actualizarUiOnlyOfficeConectado();
    showToast(L === 'es'
      ? `✅ Conectado a OnlyOffice DocSpace (${email})`
      : `✅ Connecté à OnlyOffice DocSpace (${email})`, 'success');

  } catch (err) {
    console.error('OnlyOffice login error:', err);
    showToast(L === 'es'
      ? `Error al conectar: ${err.message}`
      : `Erreur de connexion: ${err.message}`, 'error');
  } finally {
    if (span) span.textContent = L === 'es' ? 'Conectar con OnlyOffice' : 'Se connecter à OnlyOffice';
    if (btn)  btn.disabled = false;
  }
}

// ── Actualizar UI conectada ───────────────────────────────────
function actualizarUiOnlyOfficeConectado() {
  const disconnPanel = document.getElementById('oo-panel-disconnected');
  const connPanel    = document.getElementById('oo-panel-connected');
  if (disconnPanel) disconnPanel.classList.add('hidden');
  if (connPanel)    connPanel.classList.remove('hidden');
  const nameEl   = document.getElementById('oo-user-name');
  const portalEl = document.getElementById('oo-user-portal');
  if (nameEl)   nameEl.textContent   = state.ooEmail || '—';
  if (portalEl) portalEl.textContent = state.ooUrl   || '—';
  const btnUpload = document.getElementById('btn-oo-upload');
  if (btnUpload) btnUpload.disabled = !state.file;
}

// ── Logout ────────────────────────────────────────────────────
function logoutOnlyOffice() {
  state.ooUrl = state.ooToken = state.ooEmail = state.ooFolderId = state.ooFileId = null;
  state.ooViewerActive = false;
  ['oo_url','oo_token','oo_email','oo_folderid'].forEach(k => sessionStorage.removeItem(k));
  document.getElementById('oo-panel-disconnected')?.classList.remove('hidden');
  document.getElementById('oo-panel-connected')?.classList.add('hidden');
  showToast(state.lang === 'es' ? 'Sesión de OnlyOffice cerrada' : 'Session OnlyOffice fermée', 'info');
}

// ── Restaurar sesión guardada (o usar config centralizada) ────
function initOnlyOfficeSession() {
  // 1. Config centralizada del administrador: transparente para todos los docentes
  if (OO_CONFIG.portalUrl && OO_CONFIG.apiToken) {
    state.ooUrl   = OO_CONFIG.portalUrl.trim().replace(/\/+$/, '');
    state.ooToken = OO_CONFIG.apiToken.trim();
    state.ooEmail = 'Compartido por el centro educativo';

    // Obtener folderId en segundo plano (sin bloquear la UI)
    fetch(`${state.ooUrl}/api/2.0/files/@my`, {
      headers: { 'Authorization': state.ooToken, 'Accept': 'application/json' },
    })
    .then(r => r.ok ? r.json() : null)
    .then(data => { if (data?.response?.current?.id) state.ooFolderId = data.response.current.id; })
    .catch(() => {});

    // Mostrar panel "conectado" con el texto institucional
    document.getElementById('oo-panel-disconnected')?.classList.add('hidden');
    document.getElementById('oo-panel-connected')?.classList.remove('hidden');
    const nameEl   = document.getElementById('oo-user-name');
    const portalEl = document.getElementById('oo-user-portal');
    if (nameEl)   nameEl.textContent   = 'Compartido por el centro educativo';
    if (portalEl) portalEl.textContent = state.ooUrl;
    return;
  }

  // 2. Sin config centralizada → intentar restaurar sesión manual guardada
  const url      = sessionStorage.getItem('oo_url');
  const token    = sessionStorage.getItem('oo_token');
  const email    = sessionStorage.getItem('oo_email');
  const folderId = sessionStorage.getItem('oo_folderid');
  if (url && token && email && folderId) {
    state.ooUrl      = url;
    state.ooToken    = token;
    state.ooEmail    = email;
    state.ooFolderId = folderId;
    actualizarUiOnlyOfficeConectado();
  }
}

// ── Subir a DocSpace y arrancar análisis ──────────────────────
async function subirYAbrirEnOnlyOffice() {
  if (!state.file) {
    showToast(state.lang === 'es' ? 'Primero selecciona un archivo .docx' : 'Sélectionnez d\'abord un fichier .docx', 'error');
    return;
  }
  if (!state.ooToken) {
    showToast(state.lang === 'es' ? 'Primero conéctate con OnlyOffice DocSpace' : 'Connectez-vous d\'abord à OnlyOffice DocSpace', 'error');
    return;
  }
  // En modo centralizado el folderId puede estar cargando aún → obtenerlo ahora
  if (!state.ooFolderId) {
    try {
      const r    = await fetch(`${state.ooUrl}/api/2.0/files/@my`, {
        headers: { 'Authorization': state.ooToken, 'Accept': 'application/json' },
      });
      const data = await r.json();
      state.ooFolderId = data?.response?.current?.id;
    } catch { /* ignorar */ }
    if (!state.ooFolderId) {
      showToast(state.lang === 'es' ? 'No se pudo obtener la carpeta de DocSpace' : 'Impossible d\'obtenir le dossier DocSpace', 'error');
      return;
    }
  }
  const btn  = document.getElementById('btn-oo-upload');
  const span = btn?.querySelector('span');
  const L    = state.lang;
  const txtOrig = span?.textContent || '';
  if (span) span.textContent = L === 'es' ? 'Subiendo…' : 'Envoi…';
  if (btn) btn.disabled = true;

  try {
    const fileId = await uploadToDocSpace(state.ooToken, state.ooUrl, state.ooFolderId, state.file);
    state.ooFileId       = fileId;
    state.ooViewerActive = true;
    showToast(L === 'es'
      ? '✅ Subido a DocSpace — iniciando visor OnlyOffice…'
      : '✅ Envoyé vers DocSpace — démarrage du visualiseur…', 'success');
    startAnalysis();
  } catch (err) {
    console.error('OnlyOffice upload error:', err);
    showToast(L === 'es' ? `Error al subir a DocSpace: ${err.message}` : `Erreur d'envoi: ${err.message}`, 'error');
  } finally {
    if (span) span.textContent = txtOrig;
    if (btn)  btn.disabled = false;
  }
}

// ── Subir archivo vía REST ────────────────────────────────────
async function uploadToDocSpace(token, portalUrl, folderId, file) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  const resp = await fetch(`${portalUrl}/api/2.0/files/${folderId}/upload`, {
    method: 'POST',
    headers: { 'Authorization': token },
    body: formData,
  });
  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${resp.status}`);
  }
  const data   = await resp.json();
  const fileId = data?.response?.id;
  if (!fileId) throw new Error('No se recibió fileId tras la subida.');
  return fileId;
}

// ── Cargar SDK DocSpace dinámicamente ────────────────────────
async function loadDocSpaceSDK(portalUrl) {
  if (window.DocSpace?.SDK) return;
  return new Promise((resolve, reject) => {
    const existing = document.getElementById('docspace-sdk-script');
    if (existing) { existing.addEventListener('load', resolve); return; }
    const script   = document.createElement('script');
    script.id      = 'docspace-sdk-script';
    script.src     = `${portalUrl}/static/scripts/sdk/2.1.0/api.js`;
    script.onload  = resolve;
    script.onerror = () => reject(new Error('No se pudo cargar el SDK de OnlyOffice DocSpace.'));
    document.head.appendChild(script);
  });
}

// ── Renderizar visor OnlyOffice en el panel del documento ─────
async function mostrarOnlyOfficeViewer() {
  const docContent = document.getElementById('document-content');
  if (!docContent) return;
  const L       = state.lang;
  const palabras = state.fileText ? state.fileText.split(/\s+/).filter(Boolean).length : 0;

  docContent.innerHTML = `
    <div class="oo-viewer-banner">
      <span class="oo-viewer-banner-logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <rect width="32" height="32" rx="6" fill="#FF6F3E"/>
          <path d="M16 8C11.582 8 8 11.582 8 16s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6z" fill="#fff"/>
        </svg>
      </span>
      <span class="oo-viewer-banner-name" title="${state.fileName || ''}">${state.fileName || ''}</span>
      <span class="oo-viewer-banner-meta">OnlyOffice DocSpace &nbsp;·&nbsp; ${palabras} ${L === 'es' ? 'palabras' : 'mots'}</span>
      <span class="oo-viewer-banner-tag">${L === 'es' ? 'Vista fiel ✓' : 'Vue fidèle ✓'}</span>
    </div>
    <div class="oo-viewer-loading" id="oo-viewer-loading">
      <div class="oo-viewer-spinner"></div>
      <p>${L === 'es' ? 'Cargando OnlyOffice…' : 'Chargement OnlyOffice…'}</p>
    </div>
    <iframe id="oo-ds-frame"
      style="width:100%;height:75vh;min-height:520px;border:none;border-radius:0 0 8px 8px;display:none;"
      allow="fullscreen"
      title="OnlyOffice — ${state.fileName || ''}">
    </iframe>`;

  try {
    await loadDocSpaceSDK(state.ooUrl);
    if (!window.DocSpace?.SDK) throw new Error('DocSpace SDK no disponible.');
    const iframe  = document.getElementById('oo-ds-frame');
    const loading = document.getElementById('oo-viewer-loading');
    DocSpace.SDK.initViewer({
      frameId: 'oo-ds-frame',
      id:      state.ooFileId,
      width:   '100%',
      height:  '75vh',
      events: {
        onAppReady: () => {
          if (loading) loading.style.display = 'none';
          if (iframe)  iframe.style.display  = 'block';
        },
        onLoadComponentError: (err) => {
          console.error('DocSpace viewer error:', err);
          if (loading) loading.innerHTML = `<p style="color:var(--danger)">${
            L === 'es'
              ? 'Error al cargar el visor. Revisa que tu portal DocSpace permita este dominio en Developer Tools.'
              : 'Erreur de chargement. Vérifiez les Developer Tools de votre portail.'
          }</p>`;
        },
      },
    });
  } catch (err) {
    console.error('Error iniciando visor OnlyOffice:', err);
    const loading = document.getElementById('oo-viewer-loading');
    if (loading) loading.innerHTML = `
      <p style="color:var(--danger);font-size:.85rem;line-height:1.6">
        ⚠️ ${err.message}<br>
        <small>${L === 'es'
          ? 'Asegúrate de que la app se sirve desde un servidor (no file://) y que tu dominio está registrado en Developer Tools de DocSpace.'
          : 'Assurez-vous que l\'application est servie depuis un serveur (pas file://) et que votre domaine est enregistré dans Developer Tools.'
        }</small>
      </p>`;
  }
}

// ══════════════════════════════════════════════════════════════
//  MOTOR MATRIZ TPA — 3 Categorías / 17 Criterios
//  Fuente: "PROYECTO Revisor de evaluaciones.docx"
// ══════════════════════════════════════════════════════════════

// ── Diccionarios de detección ──────────────────────────────
const DICC = {
  verbosAmbiguos:    ['reflexiona','comenta','desarrolla','analiza','considera','explora','revisa','trabaja','aborda','observa','piensa','imagina','discute','estudia','examina','réfléchis','commente','développe','analyse','considère','explore','observe','imagine','discute','étudie','examine'],
  verbosImperativos: ['analiza','responde','justifica','compara','describe','explica','define','menciona','calcula','identifica','clasifica','lista','enumera','demuestra','aplica','resuelve','evalúa','sintetiza','argumenta','fundamenta','critica','propone','desarrolla','comenta','señala','indica','escribe','completa','une','marca','elige','selecciona','ordena','relaciona','nombra','redacta','analice','responda','justifique','compare','describa','explique','defina','mencione','calcule','identifique','clasifique','liste','enumere','demuestre','aplique','resuelva','evalúe','analyse','réponds','justifie','compare','décris','explique','définis','mentionne','calcule','identifie','classe','énumère','démontre','applique','résous','évalue','synthétise','argumente','rédige','complète','relie','coche','choisis','sélectionne','ordonne','nomme'],
  verbosAltaDemanda: ['argumenta','justifica','evalúa','critica','fundamenta','sintetiza','diseña','formula','propone','defiende','contrasta','argumente','justifique','evalúe','fundamente','sintetice','argumente','justifie','évalue','critique','synthétise','conçois','formule','propose','défends','contraste'],
  conectoresComplejos:['no obstante','por consiguiente','en virtud de','sin embargo','en consecuencia','por ende','de ahí que','con todo','ahora bien','así pues','en efecto','néanmoins','par conséquent','en vertu de','cependant','en conséquence','de sorte que','toutefois','ainsi donc','en effet'],
  punitivos:         ['obligatoriamente','sin excepción','bajo ninguna circunstancia','estrictamente','no puede dejar','es exigido','obligatoirement','sans exception','en aucune circonstance','strictement','il est exigé','il faut absolument'],
  sanciones:         ['se descontará','será anulado','perderá puntos','penalización','anulará','invalidará','se restará','sera annulé','perdra des points','pénalité','annulera','invalidera','sera pénalisé','points seront retirés'],
  velocidad:         ['rápidamente','de inmediato','sin demorarse','a la brevedad','velozmente','lo antes posible','rapidement','immédiatement','sans tarder','au plus vite','le plus vite possible'],
  tecnicismos:       ['hipótesis','inferencia','paradigma','epistemológico','fenomenológico','heurístico','axioma','silogismo','tautología','diacrónico','ontológico','hypothèse','inférence','paradigme','épistémologique','phénoménologique','heuristique','axiome','syllogisme','tautologie','diachronique','ontologique'],
};

const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const matchList = (texto, lista) => lista.filter(t => texto.toLowerCase().includes(t));
const matchVerbs= (texto, lista) => lista.filter(v => new RegExp(`(^|[^\\p{L}])${escapeRegExp(v)}([^\\p{L}]|$)`, 'iu').test(texto));
const sentences = t => t.split(/[.!?;]/).map(s=>s.trim()).filter(Boolean);
const escapeHtml = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

// ── Los 17 criterios de la Matriz ─────────────────────────
const CRITERIOS_ANALISIS = [
  // ───── CATEGORÍA 1: COMPRENSIÓN LECTORA ─────────────────
  { id:'1.1', cat:'cl',
    nombre:{ es:'Extensión excesiva de enunciados', fr:'Longueur excessive des énoncés' },
    analizar(t,p){
      const largas   = sentences(t).filter(o=>o.split(/\s+/).length>30).length;
      const multiV   = p.filter(o=>matchVerbs(o,DICC.verbosImperativos).length>=3).length;
      if(!largas && !multiV) return null;
      return { hallazgos:[
        largas  ? `${largas} enunciado(s) con más de 30 palabras continuas.` : null,
        multiV  ? `${multiV} enunciado(s) con 3 o más verbos de acción acumulados (ej: "describe, compara y argumenta").` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Dividir enunciados largos en segmentos breves. Secuenciar acciones en pasos numerados.', fr:'Diviser les énoncés longs. Séquencer les actions en étapes numérotées.' },
    evidencia:'Alta',
  },
  { id:'1.2', cat:'cl',
    nombre:{ es:'Complejidad sintáctica', fr:'Complexité syntaxique' },
    analizar(t,p){
      const vp  = (t.match(/\b(será|serán|fue|fueron|es|son)\s+\w+[aeiou]d[oa]\b/gi)||[]).length;
      const cc  = matchList(t, DICC.conectoresComplejos);
      const cm  = sentences(t).filter(o=>(o.match(/,/g)||[]).length>3).length;
      if(vp<2 && cc.length<2 && !cm) return null;
      return { hallazgos:[
        vp>=2          ? `${vp} estructura(s) en voz pasiva (ej: "será desarrollado"). Reemplazar por voz activa.` : null,
        cc.length>=2   ? `Conectores complejos: ${cc.slice(0,4).join(', ')}.` : null,
        cm             ? `${cm} oración(es) con más de 3 comas seguidas.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Reescribir en oraciones simples. Reemplazar voz pasiva por activa. Usar conectores simples (y, pero, entonces).', fr:'Réécrire en phrases simples. Remplacer voix passive. Connecteurs simples (et, mais, alors).' },
    evidencia:'Alta',
  },
  { id:'1.3', cat:'cl',
    nombre:{ es:'Ambigüedad en instrucción', fr:'Ambiguïté dans les consignes' },
    analizar(t,p){
      const amb = matchList(t, DICC.verbosAmbiguos);
      const sinD = !/(menciona|explica|describe|nombra)\s+\d+/i.test(t);
      if(!amb.length) return null;
      return { hallazgos:[
        `Verbos ambiguos detectados: ${amb.slice(0,5).join(', ')}.`,
        sinD ? 'Sin delimitadores de cantidad ("menciona 2", "explica 1"). Considerar agregar.' : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Usar verbos observables (define, menciona, calcula, identifica). Precisar cantidad o extensión de respuesta esperada.', fr:'Utiliser des verbes observables (définit, mentionne, calcule). Préciser la quantité attendue.' },
    evidencia:'Muy alta',
  },
  { id:'1.4', cat:'cl',
    nombre:{ es:'Densidad de información visual', fr:'Densité d\'information visuelle' },
    analizar(t,p){
      const sinNum   = !/^\s*\d+[\.\)]|^\s*[a-z]\)/m.test(t);
      const multiAcc = p.filter(o=>matchVerbs(o,DICC.verbosImperativos).length>=3 && !/^\s*\d+|^\s*[a-z]\)/.test(o)).length;
      if(!sinNum && !multiAcc) return null;
      return { hallazgos:[
        sinNum && p.length>8 ? 'No se detecta numeración ni viñetas en instrucciones.' : null,
        multiAcc ? `${multiAcc} instrucción(es) con múltiples acciones sin estructura de lista.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Incorporar numeración, viñetas y espacios visuales entre preguntas.', fr:'Incorporer numérotation, puces et espaces visuels entre les questions.' },
    evidencia:'Alta',
  },
  { id:'1.5', cat:'cl',
    nombre:{ es:'Vocabulario de alta complejidad', fr:'Vocabulaire très complexe' },
    analizar(t,p){
      const tec  = matchList(t, DICC.tecnicismos);
      const ment = (t.match(/\b\w{13,}mente\b/gi)||[]);
      const nom  = (t.match(/\b\w{10,}(ción|miento|ncia|idad)\b/gi)||[]);
      if(tec.length<2 && ment.length<2 && nom.length<4) return null;
      return { hallazgos:[
        tec.length>=2  ? `Tecnicismos sin contexto: ${tec.slice(0,5).join(', ')}.` : null,
        ment.length>=2 ? `Adverbios complejos en -mente: ${[...new Set(ment)].slice(0,4).join(', ')}.` : null,
        nom.length>=4  ? `Alta presencia de nominalizaciones abstractas (${nom.length} detectadas).` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Incorporar glosario breve. Simplificar vocabulario o contextualizar términos técnicos.', fr:'Incorporer un glossaire. Simplifier le vocabulaire ou contextualiser les termes techniques.' },
    evidencia:'Alta',
  },
  { id:'1.6', cat:'cl',
    nombre:{ es:'Inferencia excesiva requerida', fr:'Inférence excessive requise' },
    analizar(t,p){
      const pron = (t.match(/\b(esto|ello|aquello)\s+(demuestra|indica|muestra|significa)/gi)||[]).length;
      const dNeg = (t.match(/\bno\b.{0,20}\b(incorrecta|incorrecto|ninguno|jamás)\b/gi)||[]).length;
      const pNeg = p.filter(o=>/¿.{0,80}(NO|no es|no corresponde).{0,30}\?/.test(o)).length;
      if(!pron && !dNeg && !pNeg) return null;
      return { hallazgos:[
        pron>=2 ? `${pron} pronombre(s) ambiguos sin referente cercano (ej: "esto demuestra…"). Reemplazar por referente explícito.` : null,
        dNeg    ? `${dNeg} doble(s) negación detectada(s). Reformular en afirmativo.` : null,
        pNeg    ? `${pNeg} pregunta(s) con negación explícita (¿Cuál NO…?).` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Reemplazar pronombres por referentes explícitos. Reformular negaciones en afirmativo. Simplificar cadenas causales.', fr:'Remplacer les pronoms par des référents explicites. Reformuler les négations positivement.' },
    evidencia:'Alta',
  },
  // ───── CATEGORÍA 2: VELOCIDAD DE PROCESAMIENTO ──────────
  { id:'2.1', cat:'vp',
    nombre:{ es:'Cantidad excesiva de ítems', fr:'Quantité excessive d\'items' },
    analizar(t,p){
      const n    = p.filter(o=>/^\s*\d+[\.\)]/.test(o)||o.includes('?')).length;
      const dev  = p.filter(o=>/explique|justifique|fundamente|argumente|desarrolle|développe|rédige|synthétise/i.test(o)).length;
      const mT   = p.filter(o=>matchVerbs(o,DICC.verbosImperativos).length>=4).length;
      const prob = [];
      if(n>=20) prob.push(`${n} preguntas detectadas. Verificar si el tiempo asignado es suficiente.`);
      if(dev>3)  prob.push(`${dev} preguntas de desarrollo extenso (recomendado: máximo 3).`);
      if(mT)     prob.push(`${mT} ítem(s) con 4 o más microtareas acumuladas en una sola pregunta.`);
      return prob.length ? {hallazgos:prob} : null;
    },
    sugerencia:{ es:'Reducir número de ítems o aumentar el tiempo. Priorizar profundidad sobre cantidad. Dividir tareas complejas.', fr:'Réduire les items ou augmenter le temps. Privilégier la profondeur à la quantité.' },
    evidencia:'Alta',
  },
  { id:'2.2', cat:'vp',
    nombre:{ es:'Tiempo insuficiente por tarea', fr:'Temps insuffisant par tâche' },
    analizar(t,p){
      const texL = (t.match(/(?:Lee|Observa|Analiza).{200,}/gs)||[]).length;
      const mPr  = p.filter(o=>['leer','calcular','justificar','analizar','comparar','redactar','graficar','lire','calculer','justifier','analyser','comparer','rédiger','tracer'].filter(v=>o.toLowerCase().includes(v)).length>=3).length;
      if(!texL && !mPr) return null;
      return { hallazgos:[
        texL ? `${texL} texto(s) de lectura muy extenso(s). Verificar proporcionalidad con preguntas asociadas.` : null,
        mPr  ? `${mPr} pregunta(s) exigen 3 o más procesos cognitivos simultáneos (leer + calcular + justificar).` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Fragmentar lecturas largas. Aumentar tiempo o simplificar tareas. Secuenciar procesos cognitivos en etapas.', fr:'Fragmenter les textes longs. Augmenter le temps ou simplifier. Séquencer les processus.' },
    evidencia:'Alta',
  },
  { id:'2.3', cat:'vp',
    nombre:{ es:'Multiplicidad de demandas simultáneas', fr:'Multiplicité de demandes simultanées' },
    analizar(t,p){
      const c = p.filter(o=>matchVerbs(o,DICC.verbosImperativos).length>=3).length;
      if(!c) return null;
      return { hallazgos:[`${c} ítem(s) con 3 o más instrucciones operativas simultáneas en una sola pregunta.`] };
    },
    sugerencia:{ es:'Separar habilidades en etapas. Dividir instrucciones en pasos numerados independientes.', fr:'Séparer les compétences en étapes. Diviser les consignes en étapes numérotées.' },
    evidencia:'Alta',
  },
  { id:'2.4', cat:'vp',
    nombre:{ es:'Formato visual saturado', fr:'Format visuel saturé' },
    analizar(t,p){
      const con = p.filter(o=>o.trim()).length;
      const vac = p.filter(o=>!o.trim()).length;
      const den = con / Math.max(con+vac,1);
      if(den<0.85) return null;
      return { hallazgos:[`Alta densidad visual: ${Math.round(den*100)}% del espacio con contenido. Muy pocas líneas en blanco.`] };
    },
    sugerencia:{ es:'Aumentar márgenes y espacios entre preguntas. Simplificar distribución visual por página.', fr:'Augmenter les marges et les espaces entre questions. Simplifier la distribution visuelle.' },
    evidencia:'Media',
  },
  { id:'2.5', cat:'vp',
    nombre:{ es:'Cambios frecuentes de formato', fr:'Changements fréquents de format' },
    analizar(t,p){
      const fmt = new Set();
      p.forEach(o=>{
        if(/seleccione|marque|encierre|coche|choisis|sélectionne|[a-d]\)/i.test(o)) fmt.add('selección múltiple');
        if(/explique|justifique|desarrolle|argumente|développe|rédige/i.test(o))  fmt.add('desarrollo');
        if(/complete|llene|complète|remplis|_____/i.test(o))                      fmt.add('completar');
        if(/relacione|una con flechas|relie|associe/i.test(o))                   fmt.add('unir/relacionar');
        if(/verdadero|falso|vrai|faux|V o F|V\/F/i.test(o))                      fmt.add('V / F');
      });
      if(fmt.size<3) return null;
      return { hallazgos:[`${fmt.size} tipos de formato de respuesta detectados: ${[...fmt].join(', ')}.`] };
    },
    sugerencia:{ es:'Agrupar ítems del mismo formato en secciones. Incorporar títulos de sección. Mantener estructura estable.', fr:'Regrouper les items par format en sections. Maintenir une structure stable.' },
    evidencia:'Media',
  },
  // ───── CATEGORÍA 3: ANSIEDAD EVALUATIVA ─────────────────
  { id:'3.1', cat:'ae',
    nombre:{ es:'Lenguaje amenazante o punitivo', fr:'Langage menaçant ou punitif' },
    analizar(t,p){
      const pun  = matchList(t, DICC.punitivos);
      const san  = matchList(t, DICC.sanciones);
      const may  = (t.match(/[A-ZÁÉÍÓÚÑ]{5,}/g)||[]).length;
      const vel  = matchList(t, DICC.velocidad);
      const negD = (t.match(/\bNO\s+[a-záéíóúñ]+/g)||[]).length;
      if(!pun.length && !san.length && may<4 && !vel.length) return null;
      return { hallazgos:[
        pun.length ? `Términos de presión u obligación: ${pun.join(', ')}.` : null,
        san.length ? `Advertencias punitivas: ${san.join(', ')}. Eliminar o reformular.` : null,
        may>=4     ? `Uso excesivo de mayúsculas completas (${may} instancias).` : null,
        vel.length ? `Lenguaje de urgencia/velocidad: ${vel.join(', ')}.` : null,
        negD>5     ? `${negD} instrucciones prohibitivas ("NO + verbo"). Reformular en positivo.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Sustituir lenguaje punitivo por formulaciones neutras y positivas. Eliminar advertencias innecesarias.', fr:'Remplacer le langage punitif par des formulations neutres. Éliminer les avertissements inutiles.' },
    evidencia:'Muy alta',
  },
  { id:'3.2', cat:'ae',
    nombre:{ es:'Alta concentración de dificultad inicial', fr:'Forte difficulté initiale' },
    analizar(t,p){
      const prim = p.filter(o=>o.trim()).slice(0,12);
      const comp = prim.filter(o=>matchVerbs(o,DICC.verbosAltaDemanda).length>0).length;
      const pal  = prim.reduce((acc,o)=>acc+o.split(/\s+/).length,0);
      if(comp<2 && pal<=300) return null;
      return { hallazgos:[
        comp>=2  ? `${comp} pregunta(s) de alta demanda cognitiva en los primeros ítems. Iniciar con preguntas más accesibles.` : null,
        pal>300  ? `Alta densidad textual al inicio (${pal} palabras). Distribuir carga progresivamente.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Iniciar con preguntas de reconocimiento o respuesta breve. Distribuir complejidad en forma ascendente.', fr:'Commencer par des questions de reconnaissance. Distribuer la complexité progressivement.' },
    evidencia:'Alta',
  },
  { id:'3.3', cat:'ae',
    nombre:{ es:'Instrucciones poco predecibles', fr:'Consignes peu prévisibles' },
    analizar(t,p){
      const enc  = /(parte|sección|bloque|ítem)\s+[IVX\d]/i.test(t);
      const sinE = p.filter(o=>DICC.verbosAmbiguos.some(v=>new RegExp('\\b'+v+'\\b','i').test(o)) && !/ejemplo|ej\./i.test(o)).length;
      if(enc && sinE<3) return null;
      return { hallazgos:[
        !enc && p.length>15 ? 'Sin encabezados de sección visibles (Parte I, Sección A, etc.).' : null,
        sinE>=3 ? `${sinE} instrucción(es) ambigua(s) sin ejemplo orientador.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Incorporar encabezados entre secciones. Agregar ejemplos en formatos complejos. Mantener patrón de respuesta estable.', fr:'Incorporer des titres entre sections. Ajouter des exemples. Maintenir un format stable.' },
    evidencia:'Alta',
  },
  { id:'3.4', cat:'ae',
    nombre:{ es:'Penalización excesiva del error', fr:'Pénalisation excessive de l\'erreur' },
    analizar(t,p){
      const pNeg = p.filter(o=>/¿.{0,80}(NO|no es|no corresponde|no sería).{0,30}\?/.test(o)).length;
      const dNeg = (t.match(/\bno\b.{0,20}\b(incorrecta|incorrecto|ninguno)\b/gi)||[]).length;
      const evit = ['evite equivocarse','no cometa errores','tenga cuidado de no'].filter(x=>t.toLowerCase().includes(x)).length;
      if(!pNeg && !dNeg && !evit) return null;
      return { hallazgos:[
        pNeg ? `${pNeg} pregunta(s) formulada(s) en negativo (¿Cuál NO…?). Reformular en afirmativo.` : null,
        dNeg ? `${dNeg} doble(s) negación detectada(s). Simplificar redacción.` : null,
        evit ? 'Instrucciones centradas en evitar errores (en lugar del logro esperado).' : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Reformular preguntas negativas en afirmativo. Enfocar instrucciones en el logro, no en el error.', fr:'Reformuler les questions négatives positivement. Focaliser sur la réussite, pas sur l\'erreur.' },
    evidencia:'Alta',
  },
  { id:'3.5', cat:'ae',
    nombre:{ es:'Sobrecarga temporal explícita', fr:'Surcharge temporelle explicite' },
    analizar(t,p){
      const rT  = (t.match(/\d+\s*minutos?|\d+\s*min\.?/gi)||[]).length;
      const vel = matchList(t, DICC.velocidad);
      if(rT<=4 && !vel.length) return null;
      return { hallazgos:[
        rT>4       ? `${rT} referencias temporales repetidas. Unificar en tiempo global.` : null,
        vel.length ? `Lenguaje de urgencia/velocidad: ${vel.join(', ')}.` : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Reducir presión temporal explícita. Unificar tiempos globales. Priorizar calidad sobre velocidad.', fr:'Réduire la pression temporelle. Unifier les temps. Priorité à la qualité sur la vitesse.' },
    evidencia:'Alta',
  },
  { id:'3.6', cat:'ae',
    nombre:{ es:'Escasa orientación inicial', fr:'Peu d\'orientation initiale' },
    analizar(t,p){
      const prim  = p.filter(o=>o.trim()).slice(0,5);
      const intro = prim.some(o=>/instruccion|orientacion|a continuacion|estimado|esta evaluacion|consigne|orientation|ci-dessous|cher élève|cette évaluation/i.test(o));
      const num0  = /^\s*\d+[\.\)]/.test(prim.slice(0,3).join('\n'));
      if(intro && !num0) return null;
      return { hallazgos:[
        !intro ? 'Sin bloque de orientación o instrucción general al inicio.' : null,
        num0   ? 'Comienza directamente con preguntas numeradas, sin orientación previa al estudiante.' : null,
      ].filter(Boolean)};
    },
    sugerencia:{ es:'Incorporar bloque introductorio con instrucciones generales. Organizar por secciones con títulos claros.', fr:'Incorporer un bloc introductif avec des consignes générales. Organiser par sections titrées.' },
    evidencia:'Alta',
  },
];

// ── Extracción de texto plano para análisis (mammoth) ──────
async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();

  // Guardamos el buffer para renderizado posterior con docx-preview
  state.fileBuffer = arrayBuffer.slice(0);
  state.fileHasTables = await docxHasTables(arrayBuffer.slice(0));

  // mammoth → texto plano para el motor de la Matriz TPA
  const resultado = await mammoth.extractRawText({ arrayBuffer: arrayBuffer.slice(0) });
  const texto     = resultado.value
    .replace(/[ \t]+/g, ' ')
    .trim();
  const parrafos  = texto.split('\n').map(l => l.trim()).filter(Boolean);

  try {
    const htmlResult = await mammoth.convertToHtml(
      { arrayBuffer: arrayBuffer.slice(0) },
      {
        includeDefaultStyleMap: true,
        convertImage: mammoth.images.imgElement(async image => ({
          src: `data:${image.contentType};base64,${await image.readAsBase64String()}`
        }))
      }
    );
    state.fileHtml = htmlResult.value || '';
  } catch (err) {
    console.warn('No se pudo generar vista HTML estructurada:', err);
    state.fileHtml = '';
  }

  return { texto, parrafos };
}

async function docxHasTables(arrayBuffer) {
  try {
    if (typeof JSZip === 'undefined') return false;
    const zip = await JSZip.loadAsync(arrayBuffer);
    const documentXml = await zip.file('word/document.xml')?.async('string');
    return !!documentXml && /<w:tbl[\s>]/.test(documentXml);
  } catch (err) {
    console.warn('No se pudo detectar tablas en el DOCX:', err);
    return false;
  }
}

// ── Renderizado visual fiel con docx-preview ───────────────
async function renderizarDocx(container) {
  if (!container || !state.fileBuffer) return;

  // Muestra spinner mientras carga
  container.innerHTML = `
    <div style="text-align:center;padding:3rem;color:var(--text-muted)">
      <div style="font-size:2rem;margin-bottom:.5rem">⏳</div>
      <p style="font-size:.85rem">${state.lang === 'es' ? 'Renderizando documento con formato Word...' : 'Rendu du document avec le format Word...'}</p>
    </div>`;

  try {
    // docx-preview conserva mejor el diseño cuando respeta ancho, alto y secciones del .docx.
    if (typeof window.docx === 'undefined') {
      throw new Error('docx-preview no está disponible');
    }

    await window.docx.renderAsync(
      state.fileBuffer.slice(0),   // clonar buffer antes de usar
      container,
      null,
      {
        className:                     'docx-render',
        inWrapper:                     true,
        ignoreWidth:                   false,
        ignoreHeight:                  false,
        ignoreFonts:                   false,
        renderHeaders:                 true,
        renderFooters:                 true,
        renderFootnotes:               true,
        renderEndnotes:                true,
        breakPages:                    true,
        ignoreLastRenderedPageBreak:   true,
        experimental:                  true,
        trimXmlDeclaration:            true,
        useBase64URL:                  true,
      }
    );

    const renderedTables = container.querySelectorAll('table').length;
    if (state.fileHasTables && renderedTables === 0 && state.fileHtml) {
      renderizarDocxEstructurado(container, 'tables');
    } else {
      applyInlineFindings(container, state.analysisResults);
      injectDocxViewActions(container, 'word');
    }
  } catch (err) {
    console.warn('docx-preview falló, usando vista simplificada:', err);
    renderizarDocxEstructurado(container, 'fallback');
  }
}

function injectDocxViewActions(container, activeMode) {
  const existing = container.querySelector('.docx-view-actions');
  if (existing) existing.remove();
  if (!state.fileHtml) return;

  const actions = document.createElement('div');
  actions.className = 'docx-view-actions';
  actions.innerHTML = `
    <button type="button" class="${activeMode === 'word' ? 'active' : ''}" onclick="renderizarDocx(document.getElementById('docx-preview-target'))">
      ${state.lang === 'es' ? 'Vista Word' : 'Vue Word'}
    </button>
    <button type="button" class="${activeMode !== 'word' ? 'active' : ''}" onclick="renderizarDocxEstructurado(document.getElementById('docx-preview-target'), 'manual')">
      ${state.lang === 'es' ? 'Vista con tablas' : 'Vue avec tableaux'}
    </button>
  `;
  container.prepend(actions);
}

function renderizarDocxEstructurado(container, reason = 'manual') {
  if (!container) return;
  const notice = reason === 'tables'
    ? (state.lang === 'es'
        ? 'Se detectaron tablas en el Word. Se activó una vista estructurada para conservar filas y celdas.'
        : 'Des tableaux ont été détectés. Une vue structurée conserve les lignes et les cellules.')
    : (state.lang === 'es'
        ? 'Vista estructurada del documento: conserva tablas y contenido cuando la vista Word local no puede reproducirlo completo.'
        : 'Vue structurée du document: conserve les tableaux et le contenu lorsque la vue Word locale ne peut pas tout reproduire.');

  const html = state.fileHtml || state.fileParrafos
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join('');

  container.innerHTML = `
    <div class="docx-structured-notice">${notice}</div>
    <div class="docx-structured-page">${html}</div>
  `;
  applyInlineFindings(container.querySelector('.docx-structured-page'), state.analysisResults);
  injectDocxViewActions(container, 'tables');
}

function applyInlineFindings(root, results) {
  if (!root || !results) return;
  const findings = results.filter(r => r.encontro);
  root.querySelectorAll('.inline-finding').forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent));
  });

  findings.forEach(finding => {
    const candidates = getFindingCandidates(finding)
      .filter(Boolean)
      .map(normalizeCandidate)
      .filter((value, index, arr) => value.length >= 2 && arr.indexOf(value) === index);
    if (!candidates.length) return;
    markCandidatesInRoot(root, finding, candidates);
  });
}

function normalizeCandidate(value) {
  return String(value)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s+/g, '\\s+');
}

function getFindingCandidates(finding) {
  const text = state.fileText || '';
  switch (finding.id) {
    case '1.1':
      return sentences(text).filter(s => s.split(/\s+/).length > 30).slice(0, 6);
    case '1.2':
      return [
        ...matchList(text, DICC.conectoresComplejos),
        ...((text.match(/\b(será|serán|fue|fueron|es|son)\s+\w+[aeiou]d[oa]\b/gi) || []))
      ];
    case '1.3':
      return matchList(text, DICC.verbosAmbiguos);
    case '1.4':
      return state.fileParrafos
        .filter(p => matchVerbs(p, DICC.verbosImperativos).length >= 3)
        .slice(0, 4);
    case '1.5':
      return [
        ...matchList(text, DICC.tecnicismos),
        ...((text.match(/\b\w{13,}mente\b/gi) || [])),
        ...((text.match(/\b\w{10,}(ción|miento|ncia|idad)\b/gi) || []))
      ];
    case '1.6':
      return [
        ...((text.match(/\b(esto|ello|aquello)\s+(demuestra|indica|muestra|significa)/gi) || [])),
        ...((text.match(/\bno\b.{0,20}\b(incorrecta|incorrecto|ninguno|jamás)\b/gi) || [])),
        ...state.fileParrafos.filter(p => /¿.{0,80}(NO|no es|no corresponde).{0,30}\?/.test(p)).slice(0, 4)
      ];
    case '2.1':
    case '2.2':
    case '2.3':
      return state.fileParrafos
        .filter(p => matchVerbs(p, DICC.verbosImperativos).length >= (finding.id === '2.3' ? 3 : 4)
          || /explique|justifique|fundamente|argumente|desarrolle|développe|rédige|synthétise/i.test(p))
        .slice(0, 6);
    case '2.4':
      return state.fileParrafos.filter(p => p.split(/\s+/).length > 25).slice(0, 4);
    case '2.5':
      return state.fileParrafos
        .filter(p => /seleccione|marque|encierre|coche|choisis|complete|llene|relacione|verdadero|falso|vrai|faux|_____/i.test(p))
        .slice(0, 6);
    case '3.1':
      return [
        ...matchList(text, DICC.punitivos),
        ...matchList(text, DICC.sanciones),
        ...matchList(text, DICC.velocidad),
        ...((text.match(/\bNO\s+[a-záéíóúñ]+/gi) || [])),
        ...((text.match(/[A-ZÁÉÍÓÚÑ]{5,}/g) || []))
      ];
    case '3.2':
      return state.fileParrafos.filter(p => matchVerbs(p, DICC.verbosAltaDemanda).length > 0).slice(0, 5);
    case '3.3':
      return state.fileParrafos
        .filter(p => DICC.verbosAmbiguos.some(v => new RegExp(`(^|[^\\p{L}])${escapeRegExp(v)}([^\\p{L}]|$)`, 'iu').test(p)) && !/ejemplo|ej\./i.test(p))
        .slice(0, 6);
    case '3.4':
      return [
        ...state.fileParrafos.filter(p => /¿.{0,80}(NO|no es|no corresponde|no sería).{0,30}\?/.test(p)).slice(0, 4),
        ...((text.match(/\bno\b.{0,20}\b(incorrecta|incorrecto|ninguno)\b/gi) || [])),
        ...['evite equivocarse', 'no cometa errores', 'tenga cuidado de no'].filter(x => text.toLowerCase().includes(x))
      ];
    case '3.5':
      return [
        ...((text.match(/\d+\s*minutos?|\d+\s*min\.?/gi) || [])),
        ...matchList(text, DICC.velocidad)
      ];
    case '3.6':
      return state.fileParrafos.filter(Boolean).slice(0, 3);
    default:
      return [];
  }
}

function markCandidatesInRoot(root, finding, candidates) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (parent.closest('.docx-view-actions, .docx-structured-notice, script, style, button, textarea, .inline-finding')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  const label = `${finding.id} · ${finding.nombre[state.lang]}`;
  const pattern = new RegExp(`(${candidates.join('|')})`, 'giu');

  nodes.forEach(node => {
    const text = node.nodeValue;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    text.replace(pattern, (match, _g, offset) => {
      if (offset > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
      const span = document.createElement('span');
      span.className = `inline-finding ${finding.cat}`;
      span.dataset.finding = finding.id;
      span.title = label;
      span.textContent = match;
      span.addEventListener('click', () => activateRealFinding(finding.id));
      frag.appendChild(span);
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    node.replaceWith(frag);
  });
}

function activateRealFinding(id) {
  document.querySelectorAll('.inline-finding.active').forEach(el => el.classList.remove('active'));
  document.querySelectorAll(`.inline-finding[data-finding="${CSS.escape(id)}"]`).forEach(el => el.classList.add('active'));
  document.querySelectorAll('.suggestion-card.active').forEach(el => el.classList.remove('active'));
  const card = document.getElementById(`card-real-${id.replace('.', '-')}`);
  if (card) {
    card.classList.add('active');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  switchSidebarTab('report');
}

// ── Motor de análisis: aplica los 17 criterios ─────────────
function runMatrixAnalysis(texto, parrafos) {
  return CRITERIOS_ANALISIS.map(criterio => {
    try {
      const res = criterio.analizar(texto, parrafos);
      return {
        id: criterio.id,
        cat: criterio.cat,
        nombre: criterio.nombre,
        evidencia: criterio.evidencia,
        sugerencia: criterio.sugerencia,
        hallazgos: res ? res.hallazgos : [],
        encontro: res !== null,
      };
    } catch(e) {
      return { id:criterio.id, cat:criterio.cat, nombre:criterio.nombre, evidencia:criterio.evidencia, sugerencia:criterio.sugerencia, hallazgos:[], encontro:false };
    }
  });
}

// ── Editor en modo archivo real ────────────────────────────
async function initEditorReal() {
  const docNameEl = document.getElementById('editor-doc-name');
  if (docNameEl) docNameEl.textContent = state.fileName || '—';

  const docContent = document.getElementById('document-content');
  if (docContent) {
    docContent.classList.remove('docx-viewer-mode');
    if (state.ooViewerActive && state.ooFileId && state.ooUrl && state.ooToken) {
      // ── Modo OnlyOffice DocSpace: fidelidad perfecta ──
      docContent.classList.add('docx-viewer-mode');
      mostrarOnlyOfficeViewer();
    } else if (state.sourceMode === 'text') {
      const palabras = state.fileText ? state.fileText.split(/\s+/).filter(Boolean).length : 0;
      const parrafos = state.fileParrafos.length;
      docContent.innerHTML = `
        <div class="analysis-source-banner">
          <span>📝 ${state.fileName}</span>
          <span>${parrafos} ${state.lang === 'es' ? 'párrafos' : 'paragraphes'} · ${palabras} ${state.lang === 'es' ? 'palabras' : 'mots'}</span>
        </div>
        <div class="pasted-doc-preview">
          ${state.fileParrafos.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>`;
      applyInlineFindings(docContent.querySelector('.pasted-doc-preview'), state.analysisResults);
    } else {
      // ── Modo local: docx-preview (mejor esfuerzo) ──
      docContent.classList.add('docx-viewer-mode');
      const palabras = state.fileText ? state.fileText.split(/\s+/).filter(Boolean).length : 0;
      const parrafos = state.fileParrafos.length;

      docContent.innerHTML = `
        <div class="analysis-source-banner docx-banner">
          <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            📄
            ${state.fileName}
          </span>
          <span>
            ${parrafos} ${state.lang === 'es' ? 'párrafos' : 'paragraphes'} · ${palabras} ${state.lang === 'es' ? 'palabras' : 'mots'}
          </span>
          <span class="docx-fidelity-note">
            ${state.lang === 'es'
              ? 'Vista local fiel al tamaño de página; desplázate horizontalmente si es necesario.'
              : 'Aperçu local fidèle à la taille de page; faites défiler horizontalement si nécessaire.'}
          </span>
        </div>
        <div id="docx-preview-target"></div>`;

      const target = document.getElementById('docx-preview-target');
      await renderizarDocx(target);
    }
  }

  renderMatrixResults(state.analysisResults);
  updateSummaryBarReal(state.analysisResults);
  const acceptAllBtn = document.getElementById('txt-acceptAllBtn');
  const exportInfo = document.getElementById('txt-exportInfo');
  if (acceptAllBtn) acceptAllBtn.classList.add('hidden');
  if (exportInfo) {
    exportInfo.textContent = state.lang === 'es'
      ? 'Revisa los hallazgos y exporta un informe pedagógico de accesibilidad'
      : 'Révisez les constats et exportez un rapport pédagogique d’accessibilité';
  }
  switchSidebarTab('report');
}

// ── Renderizar informe de criterios en sidebar ─────────────
function renderMatrixResults(results) {
  const container = document.getElementById('matrix-report-content');
  if(!container || !results) return;
  const L = state.lang;

  const alertas = results.filter(r=>r.encontro);
  const ok      = results.filter(r=>!r.encontro);

  const catLabels = {
    cl: L==='es' ? 'Comprensión Lectora'        : 'Compréhension Lecture',
    vp: L==='es' ? 'Velocidad de Procesamiento'  : 'Vitesse de Traitement',
    ae: L==='es' ? 'Ansiedad Evaluativa'         : 'Anxiété Évaluative',
  };

  // Resumen
  let html = `
    <div class="scope-note">
      <strong>${L === 'es' ? 'Alcance de revisión' : 'Portée de la révision'}:</strong>
      ${L === 'es'
        ? 'las sugerencias se limitan a accesibilidad, claridad lingüística, formato visual, carga cognitiva y estructura de instrucciones. No se proponen cambios de contenido curricular, objetivos ni nivel cognitivo.'
        : 'les suggestions se limitent à l’accessibilité, la clarté linguistique, le format visuel, la charge cognitive et la structure des consignes. Aucun changement de contenu curriculaire, d’objectifs ou de niveau cognitif n’est proposé.'}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.4rem;margin-bottom:1rem">
      ${['cl','vp','ae'].map(cat=>{
        const n = alertas.filter(r=>r.cat===cat).length;
        return `<div class="summary-pill ${cat}" style="text-align:center;padding:.4rem;border-radius:6px;font-size:.72rem;font-weight:700">
          ${catLabels[cat].split(' ')[0]}<br><span style="font-size:1.1rem">${n}</span>
        </div>`;
      }).join('')}
    </div>
    <p style="font-size:.72rem;color:var(--text-muted);margin-bottom:.8rem;text-align:center">
      ${alertas.length} ${L === 'es' ? 'criterio(s) con hallazgos' : 'critère(s) avec constats'}  ·  ${ok.length} ${L === 'es' ? 'sin problemas' : 'sans problème'}
    </p>`;

  // Criterios con hallazgos
  if(alertas.length) {
    html += `<div style="font-size:.75rem;font-weight:700;color:var(--text-muted);margin-bottom:.5rem;text-transform:uppercase">${L === 'es' ? 'Criterios con hallazgos' : 'Critères avec constats'}</div>`;
    alertas.forEach(r => {
      html += `
        <div class="suggestion-card ${r.cat}" id="card-real-${r.id.replace('.', '-')}" style="margin-bottom:.7rem" onclick="activateRealFinding('${r.id}')">
          <span class="suggestion-tag ${r.cat}">${r.id} — ${catLabels[r.cat]}</span>
          <span style="font-size:.65rem;background:${r.evidencia==='Muy alta'?'#7C3AED':'#16A34A'};color:#fff;border-radius:50px;padding:1px 6px;margin-left:4px">
            ${L === 'es' ? 'Evidencia' : 'Niveau'}: ${r.evidencia}
          </span>
          <h4 style="margin-top:.45rem;margin-bottom:.35rem;font-size:.82rem">${r.nombre[L]}</h4>
          <ul style="font-size:.78rem;margin:.3rem 0 .5rem .9rem;padding:0;color:var(--text)">
            ${r.hallazgos.map(h=>`<li style="margin-bottom:.25rem">${h}</li>`).join('')}
          </ul>
          <div class="sug-hint" style="font-size:.74rem" id="hint-real-${r.id}">
            💡 ${state.customSugerencias[r.id]?.hint || r.sugerencia[L]}
          </div>
          <button style="font-size:.68rem;margin-top:.35rem;background:transparent;border:1px dashed ${state.customSugerencias[r.id]?'var(--primary)':'var(--border)'};color:${state.customSugerencias[r.id]?'var(--primary)':'var(--text-muted)'};padding:2px 8px;border-radius:20px;cursor:pointer"
            onclick="toggleEdicionReal('${r.id}')">
            ✏️ ${state.customSugerencias[r.id]
              ? (L==='es'?'Sugerencia modificada ▾':'Suggestion modifiée ▾')
              : (L==='es'?'Modificar sugerencia':'Modifier la suggestion')}
          </button>
          <div id="edit-real-${r.id}" style="display:none;margin:.5rem 0;border:1px dashed var(--primary);border-radius:6px;padding:.6rem;background:var(--surface)">
            <p style="font-size:.7rem;font-weight:700;color:var(--primary);margin:0 0 .3rem">
              ✏️ ${L==='es'?'Complementar o modificar sugerencia':'Compléter ou modifier la suggestion'}:
            </p>
            <textarea id="edit-real-text-${r.id}" rows="3"
              style="width:100%;box-sizing:border-box;font-size:.76rem;padding:.4rem;border:1px solid var(--border);border-radius:4px;resize:vertical;font-family:inherit;line-height:1.5"
            >${state.customSugerencias[r.id]?.hint || r.sugerencia[L]}</textarea>
            <div style="display:flex;gap:.4rem;margin-top:.4rem;flex-wrap:wrap">
              <button class="btn btn-sm btn-accept" onclick="guardarEdicionReal('${r.id}')">
                💾 ${L==='es'?'Guardar':'Enregistrer'}
              </button>
              <button class="btn btn-sm btn-reject" onclick="cancelarEdicionReal('${r.id}')">
                ✕ ${L==='es'?'Cancelar':'Annuler'}
              </button>
              ${state.customSugerencias[r.id] ? `
              <button class="btn btn-sm"
                style="background:transparent;border:1px solid var(--border);color:var(--text-muted);font-size:.7rem"
                onclick="deshacerEdicionReal('${r.id}')">
                ↩ ${L==='es'?'Restaurar original':'Restaurer l\'original'}
              </button>` : ''}
            </div>
          </div>
        </div>`;
    });
  }

  // Criterios sin problemas
  if(ok.length) {
    html += `
      <details style="margin-top:.8rem">
        <summary style="font-size:.72rem;font-weight:700;color:var(--success);cursor:pointer">
          ✓ ${ok.length} ${L === 'es' ? 'criterio(s) sin problemas detectados' : 'critère(s) sans problème détecté'}
        </summary>
        <div style="margin-top:.4rem">
          ${ok.map(r=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:.3rem .5rem;background:var(--surface);border-radius:4px;margin-bottom:.3rem;font-size:.76rem">
              <span>${r.id} — ${r.nombre[L]}</span>
              <span style="color:var(--success);font-weight:700">✓ OK</span>
            </div>`).join('')}
        </div>
      </details>`;
  }

  container.innerHTML = html;
}

// ── Edición de sugerencias en modo informe real ────────────
function toggleEdicionReal(id) {
  const area = document.getElementById(`edit-real-${id}`);
  if (!area) return;
  const visible = area.style.display !== 'none';
  area.style.display = visible ? 'none' : 'block';
  if (!visible) {
    const ta = document.getElementById(`edit-real-text-${id}`);
    if (ta) ta.focus();
  }
}

function guardarEdicionReal(id) {
  const ta = document.getElementById(`edit-real-text-${id}`);
  const texto = ta ? ta.value.trim() : '';
  if (!texto) {
    showToast(state.lang==='es'?'El texto no puede estar vacío.':'Le texte ne peut pas être vide.','error');
    return;
  }
  if (!state.customSugerencias[id]) state.customSugerencias[id] = {};
  state.customSugerencias[id].hint = texto;
  // Actualizar display sin re-renderizar todo
  const display = document.getElementById(`hint-real-${id}`);
  if (display) display.innerHTML = '💡 ' + texto;
  cancelarEdicionReal(id);
  renderMatrixResults(state.analysisResults);  // refresh para actualizar botón
  showToast(state.lang==='es'?'✓ Sugerencia guardada.':'✓ Suggestion enregistrée.','success');
}

function cancelarEdicionReal(id) {
  const area = document.getElementById(`edit-real-${id}`);
  if (area) area.style.display = 'none';
}

// ── Barra resumen para modo real ───────────────────────────
function updateSummaryBarReal(results) {
  const counts = {cl:0, vp:0, ae:0};
  results.filter(r=>r.encontro).forEach(r=>counts[r.cat]++);
  const L = state.lang;
  const labels = {
    cl: L==='es'?'CL':'CL',
    vp: L==='es'?'VP':'VT',
    ae: L==='es'?'AE':'AE',
  };
  Object.entries(counts).forEach(([cat,n])=>{
    const el = document.getElementById(`summary-${cat}`);
    if(el) el.textContent = `● ${labels[cat]}: ${n}`;
  });
}

window.renderizarDocx = renderizarDocx;
window.renderizarDocxEstructurado = renderizarDocxEstructurado;
window.activateRealFinding = activateRealFinding;

// ─────────────────────────────────────────────────────────────
// 17. DEMO HINT CSS adicional
// ─────────────────────────────────────────────────────────────
function injectExtraStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .demo-hint {
      font-size: .78rem;
      color: var(--text-muted);
      background: var(--surface);
      padding: .6rem .8rem;
      border-radius: 6px;
      border: 1px dashed var(--border);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────
// 18. INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const demoDoc = document.getElementById('document-content');
  if (demoDoc) state.demoDocumentHtml = demoDoc.innerHTML;
  injectExtraStyles();
  initLoginForm();
  initDragDrop();
  state.user = { ...USUARIO_INVITADO };
  populateDashboard(state.user);
  updateTexts();
  initOnlyOfficeSession();  // Restaurar sesión OnlyOffice guardada
  showScreen('dashboard');
});
