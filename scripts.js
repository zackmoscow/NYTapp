var searchTerm = $("#searchTermInput").val();
var endYear = $("#endYearInput").val();
var startYear = $("#startYearInput").val();
var numberOfRecords = $("#numberOfRecordsInput").val();
var searchButton = $("#searchButton");
var clearResults = $("#clearResults");

function request() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm;
    //if either start or end exists, add the facet query
    if ((startYear !== "") || (endYear !== "")) {
        queryURL += "&facet_fields=source&facet=true"
    }
    console.log(typeof startYear);
    console.log(typeof endYear);
    // if start exists, add the start date
    if (startYear !== "") {
        queryURL += "&begin_date=" + startYear + "0101";
    }
    // if end exists, add the end date
    if (endYear !== "") {
        queryURL += "&end_date=" + endYear + "1231"
    }
    console.log(queryURL);
    // add the api key to the end of the queryURL
    queryURL += "&api-key=HICSIYKc7OtTR53XoTF16BxyjK8D9ehf";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (obj) {
        var response = obj.response;
        console.log(response);
        for (i = 0; i < 10; i++) {
        var resultDiv = $("<div>");
        var resultHeadline = $("<a>");
        var resultAuthor = $("<p>");
        resultHeadline.attr('href', response.docs[i].web_url).text(response.docs[i].headline.main);
        resultAuthor.text("By: " + response.docs[i].byline.original);
        resultDiv.append(resultHeadline);
        resultDiv.append(resultAuthor);
        $("#results").append(resultDiv);

        }
    });
}



$(searchButton).on('click',function(e){
    e.preventDefault();
    request();
})