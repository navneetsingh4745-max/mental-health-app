export type AssessmentQuestion = {
  id: string;
  text: string;
  textSecondary?: string; // Hindi / Context
  options: { label: string; labelSecondary?: string; value: number }[];
  isSafetyTrigger?: boolean; // If value > 0 triggers safety protocol
};

export type AssessmentModule = {
  id: string;
  title: string;
  description: string;
  titleSecondary?: string;
  descriptionSecondary?: string;
  questions: AssessmentQuestion[];
};

export const STANDARD_OPTIONS = [
  { label: 'Not at all', labelSecondary: 'बिल्कुल नहीं', value: 0 },
  { label: 'Several days', labelSecondary: 'कुछ दिन', value: 1 },
  { label: 'More than half the days', labelSecondary: 'आधे से ज़्यादा दिन', value: 2 },
  { label: 'Nearly every day', labelSecondary: 'लगभग रोज़', value: 3 },
];

export const PHQ9: AssessmentModule = {
  id: 'phq9',
  title: 'Current State',
  titleSecondary: 'वर्तमान स्थिति',
  description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
  descriptionSecondary: 'पिछले 2 हफ़्तों में, आपको कितनी बार इन समस्याओं ने परेशान किया है?',
  questions: [
    { 
      id: 'phq9_1', 
      text: 'Little interest or pleasure in doing things', 
      textSecondary: 'काम में मन न लगना या किसी चीज़ में मज़ा न आना',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_2', 
      text: 'Feeling down, depressed, or hopeless', 
      textSecondary: 'उदासी, निराशा, या ऐसा लगना कि कुछ ठीक नहीं होगा',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_3', 
      text: 'Trouble falling or staying asleep, or sleeping too much', 
      textSecondary: 'नींद न आना, बार-बार खुलना, या बहुत ज़्यादा सोना',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_4', 
      // CULTURAL ADAPTATION: Emphasizing somatic presentation (aches/pain/heaviness) critical in SA populations
      text: 'Feeling tired, having little energy, or unexplained body aches/heaviness', 
      textSecondary: 'थकान महसूस होना, कमज़ोरी लगना, या शरीर में भारीपन/दर्द रहना',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_5', 
      text: 'Poor appetite, digestive issues tied to stress, or overeating', 
      textSecondary: 'भूख कम लगना, तनाव के कारण पेट खराब होना, या बहुत ज़्यादा खाना',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_6', 
      // CULTURAL ADAPTATION: Familial disappointment mapping to guilt
      text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', 
      textSecondary: 'खुद को दोष देना या यह लगना कि आपने खुद को या अपने परिवार को निराश किया है',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_7', 
      text: 'Trouble concentrating on things, such as reading or watching TV', 
      textSecondary: 'किसी चीज़ (जैसे टीवी या अख़बार) में ध्यान लगाने में परेशानी',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_8', 
      text: 'Moving or speaking so slowly that other people could have noticed? Or being unusually restless?', 
      textSecondary: 'इतनी धीमी गति से चलना या बोलना कि लोग ध्यान दें, या फिर बहुत ज़्यादा बेचैनी होना',
      options: STANDARD_OPTIONS 
    },
    { 
      id: 'phq9_9', 
      text: 'Thoughts that you would be better off dead or of hurting yourself in some way', 
      textSecondary: 'यह खयाल आना कि मरने में ही भलाई है या खुद को चोट पहुँचाने का विचार',
      options: STANDARD_OPTIONS, 
      isSafetyTrigger: true 
    },
  ],
};

export const GAD7: AssessmentModule = {
  id: 'gad7',
  title: 'Anxiety Patterns',
  description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
  questions: [
    { id: 'gad7_1', text: 'Feeling nervous, anxious, or on edge', options: STANDARD_OPTIONS },
    { id: 'gad7_2', text: 'Not being able to stop or control worrying', options: STANDARD_OPTIONS },
    { id: 'gad7_3', text: 'Worrying too much about different things', options: STANDARD_OPTIONS },
    { id: 'gad7_4', text: 'Trouble relaxing', options: STANDARD_OPTIONS },
    { id: 'gad7_5', text: 'Being so restless that it is hard to sit still', options: STANDARD_OPTIONS },
    { id: 'gad7_6', text: 'Becoming easily annoyed or irritable', options: STANDARD_OPTIONS },
    { id: 'gad7_7', text: 'Feeling afraid as if something awful might happen', options: STANDARD_OPTIONS },
  ],
};

const YES_NO_OPTIONS = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 },
];

export const CSSRS: AssessmentModule = {
  id: 'cssrs',
  title: 'Safety Check',
  description: 'These questions help us understand if you need immediate support. You can skip any question if it feels too much right now.',
  questions: [
    { id: 'cssrs_1', text: 'Have you wished you were dead or wished you could go to sleep and not wake up?', options: YES_NO_OPTIONS },
    { id: 'cssrs_2', text: 'Have you actually had any thoughts of killing yourself?', options: YES_NO_OPTIONS },
    { id: 'cssrs_3', text: 'Have you been thinking about how you might do this?', options: YES_NO_OPTIONS },
    { id: 'cssrs_4', text: 'Have you had these thoughts and had some intention of acting on them?', options: YES_NO_OPTIONS },
    { id: 'cssrs_5', text: 'Have you started to work out or worked out the details of how to kill yourself?', options: YES_NO_OPTIONS },
    { id: 'cssrs_6', text: 'Have you ever done anything, started to do anything, or prepared to do anything to end your life?', options: YES_NO_OPTIONS },
  ],
};
