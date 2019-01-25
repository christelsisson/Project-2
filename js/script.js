//problem: retrieve content from the NYT top stories API and add it our site.
//If we dont get a successful response, let the user know.

//1a. Listen for the select menu to change (watching value)
//1b. If select value is "" do nothing and return form the function immediately!
//1c. Show a loader and clear out old stories
//2. Send a request to the NYT API for data based on the value of the select menu.
//3. If successful, parse the data and decide what parts we want to append to out DOM.
//4. Append that stuff to the DOM
//5. If unsuccessful, append and show a helpful error to the user in the UI.
//6. Hide the loader again

//note tha I havent name my sections
$(function() {
  $("#section").on("change", function() {
    const section = $(this).val();
    // console.log(section);

    //if section is empty, return

    //show loader
    //clear stories

    //make our ajax request
    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=CdOVc2egcMhkw9XEAME4ckb9AV15Rbve",
      dataType: "json"
    })
      .done(function(data) {
        //  console.log(response); //is an object!
        console.log(response.results);


        //1. filter the data to only include 12 articles with images
        //2. create .each to  run a function for each article in response.results
        //3. for each article create constance for image url, title and link
        //4. make a gym string for the article, using the constants we just created
        //5 append string to stories section
        
      })
      .fail(function() {})
      .always(function() {});
  });
});
