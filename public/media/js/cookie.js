window.createCookie = function(cookieName,cookieValue,daysToExpire){
	var date = new Date();
	date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
	document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString()+"; path=/";
}
window.accessCookie = function(cookieName){
	var name = cookieName + "=";
	var allCookieArray = document.cookie.split(';');
	for(var i=0; i<allCookieArray.length; i++)
	{
		var temp = allCookieArray[i].trim();
		if (temp.indexOf(name)==0)
			return temp.substring(name.length,temp.length);
	}
	return "";
}