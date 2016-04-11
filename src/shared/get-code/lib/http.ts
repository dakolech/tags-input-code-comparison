export class Http {

  static get(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(JSON.parse(xmlHttp.responseText));
          }
        }
        xmlHttp.open('GET', theUrl, true);
        xmlHttp.send(null);
    }
}