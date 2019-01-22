var key = "wEu0DurcBHoZraC2EZRO5KcWC89YE1i5";

var vm = new Vue({
    el: "#app",
    data: {
        query: '',
        queryTitle: '',
        resultSet: [],
        requestDone: false,
        finalRequest: '',
        offset: 0
    },
    methods: {
        // Basic Gif Search - AJAX Call
        SearchGif() {
            this.SendAjaxRequest('search')
        }, // SearchGif()
        GetTrendings() {
            this.query = 'Trendings'
            this.SendAjaxRequest('trendings')
        },
        LoadMore() {
            // on stocke l'url de la request et on ajoute l'offset? // on renvoie la meme request que la derniere effectuée
            // on ajoute le resultat de la suite au resultSetS
            this.offset += 6;
            var nRequest = this.finalRequest + "&offset=" + this.offset;
            
             // Handle scope
            var self = this;
            
            var request = new XMLHttpRequest();
        
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Load more - Request OK");

                    var jsonData = JSON.parse(request.responseText);
                    
                    //console.log("jsonData : " + jsonData);
                    //console.log("stringified : " + JSON.stringify(jsonData, null, 3));

                    // If response is not null
                    if(jsonData){
                        //self.resultSet.push(jsonData.data);
                        //self.resultSet += jsonData.data;
                        
                        for(var i = 0; i < jsonData.data.length; i++){
                            self.resultSet.push(jsonData.data[i]);
                        }
                        

//                        if(self.resultSet.length > 0){
//                            self.requestDone = true;
//                            
//                            self.queryTitle = self.query;
//                            self.query = ''
//                        }// resultSet.l > 0
                    }// jsonData not void
                }
            };// request function
            
            // Opening with last request + offset
            request.open("GET", nRequest , true);
            
            request.send();
        },
        SendAjaxRequest(requestType) {
            
            // Handle scope
            var self = this;
            
            var request = new XMLHttpRequest();
        
            request.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Request OK");

                    var jsonData = JSON.parse(request.responseText);
                    
                    // Console log displays
                    //console.log("jsonData : " + jsonData);
                    //console.log("stringified : " + JSON.stringify(jsonData, null, 4));

                    // If response is not null
                    if(jsonData){
                        self.resultSet = jsonData.data;
                        
                        //console.log("resultSet : " + self.resultSet);

                        if(self.resultSet.length > 0){
                            self.requestDone = true;
                            
                            self.queryTitle = self.query;
                            self.query = ''
                        }// resultSet.l > 0
                    }// jsonData not void
                }
            };// request function
        
            switch(requestType){
            
                case 'search': 
                // Search request : with query + key
                this.finalRequest = "https://api.giphy.com/v1/gifs/search?q=" + self.query + "&api_key="+ key + "&limit=6";
                request.open("GET", this.finalRequest , true); 
                    
                break;
                    
                case 'trendings':
                // Get trendings : with key
                this.finalRequest = "https://api.giphy.com/v1/gifs/trending?api_key="+ key + "&limit=6";
                request.open("GET", this.finalRequest , true);  
                           
                break;     
            }// switch
            request.send();
        }// SendAjaxRequest()
    } // methods
})// Vue

/* OLD */
/*

// example URL : "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"

console.log("trRequest : " + "http://api.giphy.com/v1/gifs/trending?api_key="+ key + "&limit=10");

 console.log("Request is : " + "http://api.giphy.com/v1/gifs/search?q=" + self.query + "&api_key="+ key + "&limit=6"); 

*/