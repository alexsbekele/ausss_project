import React, { useState, useEffect } from 'react'; 
import type { Language } from '@shared/types'; 
import SectionHeader from '@/components/ui/SectionHeader'; 

const TeachersSection: React.FC<{ externalLang?: Language }> = ({ externalLang }) => { 
  const [lang, setLang] = useState<Language>(externalLang || 'en'); 

  useEffect(() => { 
    if (externalLang) setLang(externalLang); 
  }, [externalLang]); 

  return ( 
    <section className="py-24 bg-blue-600 overflow-hidden rounded-[4rem] my-12 mx-4 md:mx-12 shadow-2xl relative"> 
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10"> 
        <div className="mb-12 text-center"> 
          {/* Section title changed to OUR TEACHERS */}
          <SectionHeader 
            title= { lang === 'en' ? "OUR TEACHERS" : lang === 'am' ? "መምህራኖቻችን" : "Barsiisota Keenya" }
            subtitle={ 
            lang === 'en' 
                ? "They are dedicated to student success, who believe their biggest success is the success of students!" 
                : lang === 'am' 
                ? "እነዚህ መምህራን ለተማሪዎች ስኬት የተጉ ናቸው፤ ትልቁ ስኬታቸውም የተማሪዎቻቸው ውጤታማ መሆን እንደሆነ ያምናሉ!" 
                : "Barsiisota keenya milkaa'ina barattootaaf of kennan, kanneen milkaa'inni isaanii guddaan milkaa'ina barattootaa ta'uu amanan!"
            }
            className="!mb-0" 
            titleClassName="text-white text-5xl md:text-7xl font-black italic tracking-tighter" 
            subtitleClassName="text-blue-100" 
          /> 
        </div> 

       
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-inner bg-slate-900">
          <img 
            src="images/teachers.jpg" // Using your single image
            alt="Ambo University SSC Teachers"
            className="w-full h-full object-cover" // Fills the container with the group photo
          />
          
          
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />
        </div>
        

       <div className="mt-12 text-center">
        <p className="text-blue-100 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          {lang === 'en' ? (
            "Our teachers at Ambo University Secondary School are committed to providing the highest quality education and mentorship to our students. They are ready anytime, anywhere!"
          ) : lang === 'am' ? (
            "የአምቦ ዩኒቨርሲቲ የሁለተኛ ደረጃ ትምህርት ቤት መምህራኖቻችን ከፍተኛ ጥራት ያለው ትምህርት እና ምክር ለተማሪዎቻችን ለመስጠት ቆርጠው የተነሱ ናቸው። በማንኛውም ጊዜና ቦታ ዝግጁ ናቸው!"
          ) : (
            "Mana Barumsaa Sadarkaa 2ffaa Yuunivarsiitii Ambotti, barsiisonni keenya barattoota keenyaaf barnoota qulqullina qabu fi gargaarsa barbaachisaa ta'e kennuuf yoomiyyuu duubatti hin jedhan. Yeroo kamiyyuu akkasumas bakka kamittuu barattoota keenya deeggaruuf qophii dha!"
          )}
        </p>
      </div>
      </div> 
    </section> 
  ); 
}; 

export default TeachersSection;