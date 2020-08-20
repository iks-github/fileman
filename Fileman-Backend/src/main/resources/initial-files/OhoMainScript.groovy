import com.iksgmbh.ohocamel.backend.utils.Random;
import com.iksgmbh.ohocamel.backend.utils.DateUtil;
import com.iksgmbh.ohocamel.backend.utils.HoroscopeUtil;

requestData = exchange.getProperty("HoroscopeRequestData");
StringBuffer html = new StringBuffer("&lt;section style=\&quot;background:" + requestData.getFavouriteColor() + "\&quot;&gt;");
String sep = System.getProperty("line.separator");
html.append(sep);

if ( ! DateUtil.isDateValid(requestData.getBirthday()) ) {
	html.append("&lt;p&gt;Hello &lt;i&gt;").append(requestData.getName()).append("&lt;/i&gt;,&lt;/p&gt;").append(sep);
	html.append("&lt;p&gt;I cannot read your birthday. Use one of the formats &lt;b&gt;yyyy.MM.dd&lt;/b&gt; or &lt;b&gt;dd.MM.yyyy&lt;/b&gt; to tell me when you're born.").append(sep);
	html.append("&lt;p&gt;Try again with a reasonable birthday value!").append(sep);
} else {
	
	int age = DateUtil.getAge(requestData.getBirthday());
	if (age &lt; 0) {
		html.append("Nice try to trick me! Please enter no future date!").append(sep);
	} else if (age &lt; 6) {
		html.append("&lt;p&gt;How are you, &lt;i&gt;").append(requestData.getName()).append("&lt;/i&gt;?&lt;/p&gt;").append(sep);
		html.append("&lt;p&gt;As a " + age + "-year-old you can read and write. A wonder child, eh? Sorry, I cannot see the future for wonder childen!").append(sep);
		html.append("&lt;p&gt;Bye &lt;i&gt;Scarlet&lt;/i&gt;&lt;/p&gt;").append(sep);
	} else if (age &gt; 120) {
		html.append("&lt;p&gt;How are you, &lt;i&gt;").append(requestData.getName()).append("&lt;/i&gt;?&lt;/p&gt;").append(sep);
		html.append("&lt;p&gt;In your age of " + age + " years each day is a death trap, but always keep in mind that life is live!").append(sep);
		html.append("&lt;p&gt;Bye-bye &lt;i&gt;Scarlet&lt;/i&gt;&lt;/p&gt;").append(sep);
	} else {		
		html.append("&lt;p&gt;Hello &lt;i&gt;").append(requestData.getName()).append("&lt;/i&gt;,&lt;/p&gt;").append(sep);
		executeScript:OhoCoreScript.groovy
		html.append("&lt;p&gt;Yours &lt;i&gt;Scarlet&lt;/i&gt;&lt;/p&gt;").append(sep);
		
		if (DateUtil.isToday(requestData.getBirthday())) {
			html.append("&lt;p&gt;&lt;b&gt;PS: Happy Birthday! :-)&lt;/b&gt;&lt;/p&gt;").append(sep);
		}
	} 
}
html.append("&lt;/section");
exchange.setProperty("HoroscopeResponseData", html.toString());