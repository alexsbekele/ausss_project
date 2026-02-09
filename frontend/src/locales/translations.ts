import type { Language } from '@shared/types';

export interface TranslationStrings {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations = {
  common: {
    applyNow: { en: 'Apply Now', am: 'አሁን ያመልክቱ', om: 'Amma Galmaa\'i' },
    portalBtn: { en: 'Member Portal', am: 'የአባላት ፖርታል', om: 'Kuusaa Miseensotaa' },
    viewAll: { en: 'View All', am: 'ሁሉንም ይመልከቱ', om: 'Hunda Ilaali' },
    readDetails: { en: 'Read Details', am: 'ዝርዝሩን ያንብቡ', om: 'Bal' },
  },
  home: {
    heroTitle: { en: 'Ambo University', am: 'አምቦ ዩኒቨርሲቲ', om: 'Yuunivarsiitii Amboo' },
    heroSubtitle: { en: 'Special Secondary School', am: 'ልዩ የሁለተኛ ደረጃ ትምህርት ቤት', om: 'Mana Barumsaa Addaa' },
    motto: { en: '"Every young in here is a Scientist"', am: '"እዚህ ያለ እያንዳንዱ ወጣት ሳይንቲስት ነው"', om: '"Dargaggeessi as jiru hundi Saayintistidha"' },
    latestNews: { en: 'Latest News & Announcements', am: 'የቅርብ ጊዜ ዜናዎች እና ማስታወቂያዎች', om: 'Oodeeffannoo fi Beeksisa Haaraa' },
    newsSubtitle: { en: 'Stay informed with the latest school events and updates', am: 'ስለ ትምህርት ቤቱ አዳዲስ ኩነቶች እና መረጃዎች ይወቁ', om: 'Oduuwwan haaraa fi qophiiwwan mana barumsaa irraa beekaa ta\'aa' }
  },
  about: {
    title: { en: 'About Us', am: 'ስለ እኛ', om: "Waa'ee Keenya" },
    objTitle: { en: 'Objectives of the School', am: 'የትምህርት ቤቱ ዓላማዎች', om: 'Kaayyoo Mana Barumsaa' },
    objDesc1: { 
      en: 'Ambo University Special Secondary School is located in Oromia, a regional state. Basically, the pillar motive of the school is to ensure the quality of education, generate qualified students who are competent at the national and international level.',
      am: 'የአምቦ ዩኒቨርሲቲ ልዩ የሁለተኛ ደረጃ ትምህርት ቤት በኦሮሚያ ክልላዊ መንግስት ውስጥ ይገኛል። መሰረታዊ ዓላማው የትምህርት ጥራትን ማረጋገጥ እና በሃገር አቀፍና በአለም አቀፍ ደረጃ ብቁ የሆኑ ተማሪዎችን ማፍራት ነው።',
      om: "Manni Barumsaa Addaa Sad. 2ffaa Yuunivarsiitii Amboo Oromiyaa keessatti argama. Kaayyoon isaa inni guddaan qulqullina barnootaa mirkaneessuu fi barattoota sadarkaa biyyaalessaa fi addunyaatti dorgomoo ta'an horachuudha."
    },
    adminTitle: { en: 'School Administration', am: 'የትምህርት ቤቱ አመራር', om: 'Hooggansa Mana Barumsaa' }
  },
  admission: {
    title: { en: 'Admissions', am: 'ምዝገባ እና ቅበላ', om: 'Galmeef' },
    subtitle: { en: "We are Nurturing Future High Achievers and Good Citizens", am: "የኢትዮጵያን የወደፊት ስኬታማ ሰዎች ማፍራት", om: "Milkaa'ota Itiyoophiyaa egeree ijaaruu" },
    applyBtn: { en: 'Apply Online', am: 'በኦንላይን ለመመስገብ', om: "Onlaayiniin Galmaa'uuf" },
    criteriaTitle: { en: 'Criteria for Admission', am: 'የመግቢያ መስፈርቶች', om: 'Ulaagaa Seensaa' },
    criteriaDesc: {
      en: 'Selection is based on the 8th grade regional exam results and an additional entrance examination.',
      am: 'ምርጫው በ8ኛ ክፍል ክልላዊ ፈተና ውጤት እና በልዩ የመግቢያ ፈተና ላይ የተመሰረተ ነው።',
      om: "Filannoon bu'uura qabxii kutaa 8ffaa fi qormaata seensaa mana barumsichaa irratti hundaa'a."
    },
    thresholdLabel: { en: 'Current Threshold', am: 'የመግቢያ ዝቅተኛ ውጤት', om: 'Qabxii Seensaa' },
    stepsTitle: { en: 'Admission Steps:', am: 'የምዝገባ ቅደም ተከተሎች', om: 'Duraa duuba Galmee' },
    step1: { en: 'Score Verification', am: 'ውጤት ማረጋገጥ', om: 'Qabxii Mirkaneessuu' },
    step2: { en: 'Entrance Exam', am: 'የመግቢያ ፈተና', om: 'Qormaata Seensaa' },
    step3: { en: 'Final Enrollment', am: 'የመጨረሻ ምዝገባ', om: 'Galmeessa Xumuraa' },
    grade8Result: { en: 'Grade 8 Result', am: 'የ8ኛ ክፍል ውጤት', om: 'Qabxii kuta 8ffaa' }
  },
  curriculum: {
    title: { en: 'Curriculum Overview', am: 'ስርዓተ ትምህርት', om: 'Sirna Barnootaa' },
    enrichedTitle: { en: 'Natural Science & STEM', am: 'የተፈጥሮ ሳይንስ እና STEM', om: 'Saayinsii Uumamaa fi STEM' },
    languageTitle: { en: 'Academic Language', am: 'የትምህርት ቋንቋ', om: 'Afaan Barnootaa' },
    globalTitle: { en: 'Global Leadership', am: 'ዓለም አቀፍ አመራር', om: 'Hooggansa Addunyaa' },
    naturalScienceDesc: {
      en: 'We exclusively offer a Natural Science curriculum centered on STEM, designed to empower students who will innovate for our planet and beyond.',
      am: 'ለወደፊት የፕላኔታችንን እና ከዚያም በላይ ያለውን ሁኔታ የሚቀርጹ ተማሪዎችን ለማፍራት በSTEM ላይ ያተኮረ የተፈጥሮ ሳይንስ ትምህርት ብቻ እንሰጣለን።',
      om: "Barattoota gara fuulduraa dachee keenyaa fi isaa ol uumuu danda'an horachuuf, barnoota Saayinsii Uumamaa STEM irratti xiyyeeffatu qofa ni kennina."
    },
    academicLanguageDesc: {
      en: 'English is the primary medium of instruction, ensuring our graduates are competitive on the global stage.',
      am: 'ዋናው የማስተማሪያ ቋንቋ እንግሊዝኛ ነው::',
      om: 'Afaan Ingilizii afaan barsiisaa isa guddaadha.'
    },
    globalLeadershipDesc: {
      en: 'To prepare our students for international opportunities, we provide Chinese and French as additional subjects, empowering them to excel far beyond national borders.',
      am: 'ተማሪዎቻችን ከሃገር ድንበር ተሻግረው እንዲወዳደሩ እና ለዓለም አቀፍ ዕድሎች ራሳቸውን እንዲያዘጋጁ የቻይንኛ እና የፈረንሳይኛ ቋንቋ ትምህርቶችን በተጨማሪነት እንሰጣለን።',
      om: "Barattoota keenya carraa idil-addunyaaf qopheessuuf, dabalataan barnoota afaan Chaayinaa fi Faransaayi ni kennina, kunis daangaa biyyaa darbanii akka dorgoman isaan gargaara."
    }
  },
  contact: {
    title: { en: 'Contact Us.', am: 'ጥያቄ አለዎት? ያግኙን።', om: 'Nu Quunnamuuf.' },
    locationLabel: { en: 'Location', am: 'አድራሻ', om: 'Bakka' },
    phoneLabel: { en: 'Phone', am: 'ስልክ', om: 'Bilbila' },
    emailLabel: { en: 'Email', am: 'ኢሜይል', om: 'Imayilii' }
  },
  navbar: {
    home: { en: 'Home', am: 'መነሻ', om: 'Fuula Jalqabaa' },
    about: { en: 'About', am: 'ስለ እኛ', om: "Waa'ee Keenya" },
    admission: { en: 'Admission', am: 'ምዝገባ', om: 'Galmeef' },
    curriculum: { en: 'Curriculum', am: 'የትምህርት መርሃ-ግብር', om: 'Barnoota' },
    announcements: { en: 'Announcements', am: 'ማስታወቂያዎች', om: 'Beeksisa' },
    portal: { en: 'My Portal', am: 'የኔ ፖርታል', om: 'Kuusaa Koo' },
    login: { en: 'Login', am: 'ግባ', om: 'Seenuuf' },
    logout: { en: 'Logout', am: 'ውጣ', om: 'Bahuu' }
  },
  dashboard: {
    posts: { en: 'Posts', am: 'ልጥፎች', om: 'Maxxansoota' },
    announcements: { en: 'Announcements', am: 'ማስታወቂያዎች', om: 'Beeksisa' },
    registration: { en: 'Registration', am: 'ምዝገባ', om: 'Galmeessa' },
    community: { en: 'Community', am: 'ማህበረሰብ', om: 'Hawaasa' },
    admissionScore: { en: 'Admission Score', am: 'የመግቢያ ውጤት', om: 'Qabxii Seensaa' },
    applicants: { en: 'Applicants', am: 'አመልካቾች', om: 'Iyyattoota' },
    profile: { en: 'My Profile', am: 'የኔ መገለጫ', om: 'Proofayilii Koo' },
    logout: { en: 'Log Out', am: 'ውጣ', om: 'Bahi' },
    backTo: { en: 'Back to', am: 'ወደ ... ተመለስ', om: 'Gara ... deebi\'i' }
  },
  admin: {
    announcements: {
      title: { en: 'Post Announcement', am: 'ማስታወቂያ ይለጥፉ', om: 'Beeksisa Maxxansuu' },
      editTitle: { en: 'Edit Announcement', am: 'ማስታወቂያ ያርሙ', om: 'Beeksisa Sirreessuu' },
      headline: { en: 'Headline Title', am: 'የዜናው ርዕስ', om: 'Mata-duree Beeksisaa' },
      content: { en: 'Main Content', am: 'ዝርዝር መረጃ', om: 'Qabiyyee Beeksisaa' },
      image: { en: 'Hero Image (Optional)', am: 'ምስል (አማራጭ)', om: 'Fakkii (Yoo Barbaachise)' },
      publish: { en: 'Publish Announcement', am: 'ማስታወቂያውን አውጣ', om: 'Beeksisa Labsuu' },
      update: { en: 'Update Announcement', am: 'ማስታወቂያውን አዘምን', om: 'Beeksisa Haaromsuu' },
      recentActivity: { en: 'Recent Activity', am: 'የቅርብ ጊዜ እንቅስቃሴዎች', om: 'Sochiiwwan Dhiheenyaa' },
      noAnnouncements: { en: 'No announcements posted yet.', am: 'ምንም ማስታወቂያ አልተለጠፈም።', om: 'Beeksisi maxxanfame hin jiru.' }
    },
    registration: {
      title: { en: 'Member Registration', am: 'የአባላት ምዝገባ', om: 'Galmeessa Miseensotaa' },
      name: { en: 'Full Name', am: 'ሙሉ ስም', om: 'Maqaa Guutuu' },
      email: { en: 'Email Address', am: 'ኢሜይል', om: 'Iimeelii' },
      subject: { en: 'Subject', am: 'ትምህርት', om: 'Barnoota' },
      grade: { en: 'Grade Level', am: 'የክፍል ደረጃ', om: 'Kutaa' },
      register: { en: 'Register Member', am: 'አባል መዝግብ', om: 'Miseensa Galmeessi' }
    },
    community: {
      title: { en: 'School Community', am: 'የትምህርት ቤቱ ማህበረሰብ', om: 'Hawaasa Mana Barumsaa' },
      search: { en: 'Search members...', am: 'አባላትን ፈልግ...', om: 'Miseensota Barbaadi...' },
      students: { en: 'Students', am: 'ተማሪዎች', om: 'Barattoota' },
      teachers: { en: 'Teachers', am: 'መምህራን', om: 'Barsiisota' },
      graduates: { en: 'Graduates', am: 'ተመራቂዎች', om: 'Eebbifamtoota' }
    },
    admissionScore: {
      title: { en: 'Set Admission Threshold', am: 'የመግቢያ ውጤት መወሰኛ', om: 'Qabxii Seensaa Murteessuu' },
      threshold: { en: 'Minimum Score (%)', am: 'ዝቅተኛ ውጤት (%)', om: 'Qabxii Xiqqaa (%)' },
      updateThreshold: { en: 'Update Threshold', am: 'ውጤቱን አዘምን', om: 'Qabxii Haaromsuu' }
    },
    applicants: {
      title: { en: 'Admission Applicants', am: 'አመልካቾች', om: 'Iyyattoota' },
      status: { en: 'Status', am: 'ሁኔታ', om: 'Haala' }
    }
  },
  admissionPortal: {
    title: { en: 'Online Admission Portal', am: 'የመግቢያ ምዝገባ ፖርታል', om: 'Galmeessa Onlaayinii' },
    personal: { en: 'Personal Information', am: 'የግል መረጃ', om: 'Oodeeffannoo Dhuunfaa' },
    name: { en: 'Full Name', am: 'ሙሉ ስም', om: 'Maqaa Guutuu' },
    age: { en: 'Age', am: 'ዕድሜ', om: 'Umrii' },
    location: { en: 'Location & Contact', am: 'አድራሻ እና ስልክ', om: 'Teessoo fi Quunnamtii' },
    phone: { en: 'Phone Number', am: 'ስልክ ቁጥር', om: 'Lakkoofsa Bilbilaa' },
    academic: { en: 'Academic Records', am: 'የትምህርት መረጃ', om: 'Ragaalee Barnootaa' },
    school: { en: 'School Name', am: 'የትምህርት ቤቱ ስም', om: 'Maqaa Mana Barumsaa' },
    grade8: { en: 'Grade 8 Result (%)', am: 'የ8ኛ ክፍል ውጤት (%)', om: 'Qabxii Kutaa 8ffaa (%)' },
    submit: { en: 'Verify Eligibility & Apply', am: 'ብቁ መሆንዎን ያረጋግጡና ያመልክቱ', om: 'Mirkaneessii Galmaa\'i' },
    back: { en: 'Back to Admissions', am: 'ወደ ምዝገባ ይመለሱ', om: 'Gara Galmeessaatti Deebi\'i' },
    success: { en: 'Success!', am: 'እንኳን ደስ አለዎት!', om: 'Milkoofteetta!' },
    successMsg: { 
      en: 'Congratulations! You are eligible for the exam.', 
      am: 'እንኳን ደስ አለዎት! ለፈተናው ብቁ ነዎት።', 
      om: 'Baga gammanne! Qormaataaf Darbitteetta.' 
    },
    failMsg: {
      en: 'Sorry, your score does not meet the current requirement. Keep working hard!',
      am: 'ይቅርታ፤ ውጤትዎ አሁን ካለው መስፈርት በታች ነው። ጠንክረው ይማሩ!',
      om: "Dhiifama Qabxiin keessan Gahaa miti! Har'a dangeffamtus bor seenaa jijjiiruu dandeessa!"
    }
  },
  alumniPortal: {
    title: { en: 'Join the Alumni Network', am: 'የቀድሞ ተማሪዎች መረብን ይቀላቀሉ', om: 'Hawaasa Alumni Dabalami' },
    subtitle: { 
      en: 'Share your journey and connect with your alma mater.', 
      am: 'የህይወት ጉዞዎን ያካፍሉ እና ከትምህርት ቤትዎ ጋር ይገናኙ።', 
      om: 'Adeemsa kee qoodi hawaasa mana barumsaa kee waliin wal qunnami.' 
    },
    formTitle: { en: 'Alumni Registration Form', am: 'የምዝገባ ቅጽ', om: 'Unka Galmeessa Alumni' },
    name: { en: 'Full Name', am: 'ሙሉ ስም', om: 'Maqaa Guutuu' },
    email: { en: 'Email Address', am: 'የኢሜል አድራሻ', om: 'Iimeelii' },
    gradYear: { en: 'Graduation Year', am: 'የተመረቁበት ዓመት', om: 'Waggaa Eebbaa' },
    role: { en: 'Current Job Title / Major', am: 'የአሁኑ ስራ / የትምህርት ዘርፍ', om: 'Hojii ykn Barnoota kee' },
    company: { en: 'Company / University', am: 'ድርጅት / ዩኒቨርሲቲ', om: 'Dhaabbata ykn Yuunivarsiitii' },
    bio: { en: 'Short Bio', am: 'አጭር መግለጫ', om: 'Seenaa Gabaabaa' },
    cancel: { en: 'Cancel', am: 'ሰርዝ', om: 'Haquu' },
    submit: { en: 'Submit Profile', am: 'መረጃውን ላክ', om: 'Ergi' },
    successTitle: { en: 'Registration Submitted!', am: 'ምዝገባው ተልኳል!', om: 'Galmeen Ergameera!' },
    successDesc: { 
      en: 'Your profile has been sent for verification. Once approved, you will appear in the directory.', 
      am: 'መረጃዎ ለማረጋገጥ ተልኳል። ሲጸድቅ በዝርዝሩ ውስጥ ይታያሉ።', 
      om: 'Oodeeffannoon kee mirkanaaf ergameera. Erga mirkanaa\'ee tarree keessatti mul\'ata.' 
    },
    return: { en: 'Return to Directory', am: 'ወደ ዝርዝሩ ይመለሱ', om: 'Gara Galmeetti Deebi\'i' }
  },
  announcementsPage: {
    title: { en: 'School Announcements', am: 'የመረጃ ሰሌዳ', om: 'Beeksisa Mana Barumsaa' },
    subtitle: { en: 'Official updates and news from the school administration.', am: 'የትምህርት ቤቱ ኦፊሴላዊ መረጃዎች እና ዜናዎች።', om: 'Oodeeffannoo fi oduu bulchiinsa mana barumsaa irraa.' },
    empty: { en: 'No announcements published at the moment.', am: 'በአሁኑ ጊዜ ምንም ማስታወቂያ የለም::', om: 'Yeroo ammaa beeksisi hin jiru.' },
    newsTag: { en: 'School News', am: 'የትምህርት ቤት ዜና', om: 'Oduu Mana Barumsaa' },
    adminTag: { en: 'Administration', am: 'አስተዳደር', om: 'Bulchiinsa' },
    deleteConfirm: { en: 'Are you sure you want to delete this announcement?', am: 'ይህን ማስታወቂያ መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?', om: 'Beeksisa kana haquu akka barbaaddu mirkaneeffatteettaa?' }
  },
  socialFeed: {
    placeholder: { en: "Write something...", am: "አንድ ነገር ይጻፉ...", om: "Waan tokko barreessi..." },
    postBtn: { en: "Post", am: "ልጠፍ", om: "Maxxansi" },
    commentPlaceholder: { en: "comment", am: "አስተያየት", om: "yaada" },
    likes: { en: "Likes", am: "ላይኮች", om: "Jaallatamoota" },
    comments: { en: "Comments", am: "አስተያየቶች", om: "Yaada" },
    noPosts: { en: "No posts yet. Be the first to share something!", am: "እስካሁን ምንም ልጥፍ የለም:: የመጀመሪያው ይሁኑ!", om: "Hamma yoonaatti maxxansi hin jiru. Jalqabaa ta'i!" },
    deletePost: { en: "Delete Post", am: "ልጥፉን ሰርዝ", om: "Maxxansa Haquu" }
  },
  testimonials: {
    title: { en: 'Student Voices', am: 'የተማሪዎች ድምጽ', om: 'Sagalee Barattootaa' },
    teachersTitle: { en: 'Our Teachers', am: 'የመምህራን ድምጽ', om: 'Barsiisotaa Keenya' },
    readMore: { en: 'Read More', am: 'ተጨማሪ ያንብቡ', om: 'Dabali dubbisi' },
    //institution: { en: 'Ambo University Special Secondary School', am: 'የአምቦ ዩኒቨርሲቲ ልዩ የሁለተኛ ደረጃ ትምህርት ቤት', om: 'Mana Barumsaa Addaa Sad. 2ffaa Yuunivarsiitii Amboo' }
  },
  alumniDirectory: {
    title: { en: 'Alumni Directory', am: 'የቀድሞ ተማሪዎች ዝርዝር', om: 'Galmee Alumni' },
    desc: { 
      en: 'Connect with fellow graduates. Only approved members are displayed.', 
      am: 'ከቀድሞ ተማሪዎች ጋር ይገናኙ። የጸደቁ አባላት ብቻ ይታያሉ።', 
      om: 'Barattoota duraanii waliin wal qunnamaa. Miseensota mirkanaa\'an qofatu mul\'ata.' 
    },
    join: { en: 'Register as Alumni', am: 'እንደ ቀድሞ ተማሪ ይመዝገቡ', om: 'Alumni ta\'ii galmaa\'i' },
    preview: { 
      en: 'Public preview mode. Log in for full network features.', 
      am: 'የህዝብ ቅድመ እይታ። ሙሉ መረጃ ለማግኘት ይግቡ።', 
      om: 'Kun mul\'ata ummataati. Oodeeffannoo guutuuf seeni.' 
    },
    loginNow: { en: 'Log in Now', am: 'አሁኑኑ ይግቡ', om: 'Amma Seeni' },
    search: { en: 'Search by name or company...', am: 'በስም ወይም በድርጅት ይፈልጉ...', om: 'Maqaan barbaadi...' },
    allYears: { en: 'All Years', am: 'ሁሉም ዓመታት', om: 'Waggaa hunda' },
    classOf: { en: 'Class of', am: 'የምረቃ ዓመት', om: 'Eebbifamaa' },
    noFound: { en: 'No matching alumni found.', am: 'ምንም ተማሪ አልተገኘም።', om: 'Alumni hin argamne.' },
    readMore: { en: 'Read More', am: 'ተጨማሪ ያንብቡ', om: 'Dabali' },
    readLess: { en: 'Read Less', am: 'ቀንስ', om: 'Xumuri' }
  },
  loginModal: {
    title: { en: 'Portal Login', am: 'የመግቢያ ፖርታል', om: 'Seensa Kuusaa' },
    selectDest: { en: 'Select your destination:', am: 'መድረሻዎን ይምረጡ:', om: 'Bakka deemuun barbaaddu filadhu:' },
    alumniLabel: { en: 'Alumni / Student', am: 'የቀድሞ ተማሪ / ተማሪ', om: 'Miseensa / Barataa' },
    alumniDesc: { en: 'COMMUNITY PORTAL', am: 'የማህበረሰብ ፖርታል', om: 'KUUSAA HAWAASAA' },
    teacherLabel: { en: 'Teacher', am: 'መምህር', om: 'Barsiisaa' },
    teacherDesc: { en: 'STAFF ENTRANCE', am: 'የሰራተኞች መግቢያ', om: 'SEENSA HOJJETTOOTAA' },
    directorLabel: { en: 'Director', am: 'ዳይሬክተር', om: 'Hoogganaa' },
    directorDesc: { en: 'ADMIN DASHBOARD', am: 'የአስተዳዳሪ ዳሽቦርድ', om: 'DHASHBOORDII ADMIN' },
    emailLabel: { en: 'Email Address', am: 'የኢሜል አድራሻ', om: 'Iimeelii' },
    passwordLabel: { en: 'Password', am: 'የይለፍ ቃል', om: 'Iccitii' },
    forgotPass: { en: 'Forgot Password?', am: 'የይለፍ ቃል ረስተዋል?', om: 'Iccitii dagattee?' },
    changeRole: { en: 'Change Role', am: 'ሚና ቀይር', om: 'Gahee Jijjiiri' },
    enterBtn: { en: 'Enter Portal', am: 'ወደ ፖርታል ይግቡ', om: 'Gara Kuusaatti Seeni' },
    loading: { en: 'Processing...', am: 'በማዘጋጀት ላይ...', om: 'Hojjechaa jira...' },
    recoveryTitle: { en: 'Recover Password', am: 'የይለፍ ቃል መልሶ ማግኛ', om: 'Iccitii Deebisuu' },
    recoveryDesc: { en: 'Enter your registered email to receive a temporary password.', am: 'ጊዜያዊ የይለፍ ቃል ለማግኘት የተመዘገበ ኢሜልዎን ያስገቡ።', om: 'Iccitii yeroo argachuuf iimeelii galmaa\'e galchi.' },
    sendRecovery: { en: 'Send Temporary Password', am: 'ጊዜያዊ የይለፍ ቃል ላክ', om: 'Iccitii yeroo ergi' },
    successTitle: { en: 'Check Your Email', am: 'ኢሜልዎን ያረጋግጡ', om: 'Iimeelii kee ilaali' },
    successDesc: { en: 'A temporary password has been sent to your inbox.', am: 'ጊዜያዊ የይለፍ ቃል ወደ ኢሜልዎ ተልኳል።', om: 'Iccitii yeroo iimeelii keerratti ergameera.' 
    },
    tempPassLabel: { en: 'Your Temporary Password:', am: 'የእርስዎ ጊዜያዊ የይለፍ ቃል:', om: 'Iccitii Yeroo Kee:' },
    backToLogin: { en: 'Back to Login', am: 'ወደ መግቢያ ይመለሱ', om: 'Gara Seensaatti Deebi\'i' },
    invalidAdmin: { en: 'Invalid Admin credentials.', am: 'ልክ ያልሆነ አድሚን መለያ።', om: 'Seensi Admin dogoggora.' },
    teacherFailed: { en: 'Teacher login failed. Check email or password.', am: 'የመምህር መግቢያ አልተሳካም።', om: 'Seensi barsiisaa hin milkoofne.' },
    loginFailed: { en: 'Login failed. Check your email and password.', am: 'መግባት አልተሳካም።', om: 'Seensi hin milkoofne.' },
    emailNotFound: { en: 'Email not found in our system.', am: 'ይህ ኢሜይል አልተገኘም።', om: 'Iimeeliin kun hin argamne.' }
  },
  profile: {
    notFound: { en: 'Profile not found.', am: 'መገለጫው አልተገኘም።', om: 'Proofayiliin hin argamne.' },
    changeCover: { en: 'Change Cover', am: 'የጀርባ ምስል ቀይር', om: 'Fakkii Duubaa Jijjiiri' },
    remove: { en: 'Remove', am: 'አስወግድ', om: 'Haquu' },
    changePhoto: { en: 'Change Photo', am: 'ፎቶ ቀይር', om: 'Fakkii Jijjiiri' },
    displayName: { en: 'Display Name', am: 'የሚታይ ስም', om: 'Maqaa Mul\'atu' },
    teacher: { en: 'Teacher', am: 'መምህር', om: 'Barsiisaa' },
    administrator: { en: 'Administrator', am: 'አስተዳዳሪ', om: 'Hoogganaa' },
    graduated: { en: 'Graduated', am: 'ተመራቂ', om: 'Eebbifamaa' },
    student: { en: 'Student', am: 'ተማሪ', om: 'Barataa' },
    editProfile: { en: 'Edit Profile', am: 'መገለጫን አርም', om: 'Proofayilii Sirreessi' },
    saveChanges: { en: 'Save Changes', am: 'ለውጦችን አስቀምጥ', om: 'Jijjiirama Ol-kaayi' },
    cancel: { en: 'Cancel', am: 'ሰርዝ', om: 'Haquu' },
    accountSecurity: { en: 'Account & Security', am: 'መለያ እና ደህንነት', om: 'Eegumsa Kuusaa' },
    emailAddress: { en: 'Email Address', am: 'ኢሜይል', om: 'Iimeelii' },
    password: { en: 'Portal Password', am: 'የይለፍ ቃል', om: 'Iccitii' },
    changePassword: { en: 'Change password...', am: 'የይለፍ ቃል ቀይር...', om: 'Iccitii jijjiiri...' },
    position: { en: 'Position', am: 'ደረጃ', om: 'Gahee' },
    currentGrade: { en: 'Current Grade Level', am: 'የአሁኑ የክፍል ደረጃ', om: 'Kutaa Ammaa' },
    grade: { en: 'Grade', am: 'ክፍል', om: 'Kutaa' },
    graduatedAlumni: { en: 'Graduated Alumni', am: 'ተመራቂ የቀድሞ ተማሪ', om: 'Alumni Eebbifame' },
    primarySubject: { en: 'Primary Subject', am: 'ዋና የትምህርት ዘርፍ', om: 'Barnoota Guddaa' },
    currentPosition: { en: 'Current Position', am: 'የአሁኑ የሥራ መደብ', om: 'Hojii Ammaa' },
    currentJob: { en: 'Current Job / Major', am: 'የአሁኑ ስራ / የትምህርት ዘርፍ', om: 'Hojii ykn Barnoota Ammaa' },
    notSpecified: { en: 'Not specified', am: 'አልተገለጸም', om: 'Hin ibsamne' },
    bioTitle: { en: 'Biography & Vision', am: 'የህይወት ታሪክ እና ራዕይ', om: 'Seenaa fi Mul\'ata' },
    bioPlaceholder: { en: 'Share your achievements and aspirations...', am: 'ስኬቶችዎን እና ምኞቶችዎን ያካፍሉ...', om: 'Milkaa\'ina kee qoodi...' },
    privateBio: { en: 'This user is keeping their journey private for now.', am: 'ይህ ተጠቃሚ መረጃውን ለጊዜው በሚስጥር ይዟል።', om: 'Namni kun seenaa isaa dhuunfaatti qabatee jira.' },
    updateSuccess: { en: 'Profile updated successfully!', am: 'መገለጫው በትክክል ተዘምኗል!', om: 'Proofayiliin milkaa\'inaan haaromfameera!' }
  }
};
