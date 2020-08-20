String personType = HoroscopeUtil.getPersonType(requestData);

String horoscope = Random.oneOf(
	"Tomorrow, lucky " + personType + ", you'll have a golden day. " +
	      "Having a great time with good friends and making good decisions in any case " +
	      "- all will be yours. Enjoy this day!",
	      
	"I'm sorry, but tomorrow you'll be an unfortunate " + personType + ". There is no luck for you, " +
		  "so avoid personnel contacts, make no critical decisions, stay at home and " +
		  "read an interesting book or watch a cool video." +
		  " Another time will come soon for a " + personType + " like you...",
		  
	"Now, this is really funny. Tomorrow will be boring for you, regardless what you are planning." +
	      " Best you can do, is to work hard. This isn't fun, but you will be happy about your work " +
	      "the day after tomorrow!",
	      
	"Oh " + personType + ", be careful tomorrow! Good and bad strongly depends on your decisions and behaviour. Watch out and think well before acting!" +
	      " Do not trust the people you meet. Remember: a bad friend is worse than a good enemy!"
);

html.append("&lt;p&gt;").append(sep);
html.append(horoscope).append(sep);
html.append("&lt;/p&gt;").append(sep);