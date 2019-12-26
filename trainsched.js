  var firebaseConfig = {
    apiKey: "AIzaSyB2IHc_57aAf267fnvjiWODXTHCC-NeeuQ",
    authDomain: "traintimer-379ab.firebaseapp.com",
    databaseURL: "https://traintimer-379ab.firebaseio.com",
    projectId: "traintimer-379ab",
    storageBucket: "traintimer-379ab.appspot.com",
    messagingSenderId: "380169653065",
    appId: "1:380169653065:web:6b5d804c23e76acceaa898"
  };

  firebase.initializeApp(firebaseConfig);
  var trainInfo = firebase.database() 

  var trains = {
  };
  
  trainInfo.ref().on("child_added", function (childSnapshot){
    console.log(childSnapshot.val())
    //console.log(childSnapshot.val());
    var thisTrain = childSnapshot.val();
    var tFrequency = thisTrain.frequency;
    console.log(thisTrain.firstTrain);
    var firstTime = thisTrain.firstTrain;
    var theTrainName = thisTrain.name;
    var finalDestin = thisTrain.destination;
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    
    var currentTime = moment();
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    console.log("The frequency of this train is " + tFrequency);
    console.log("The final destination of this train is " + finalDestin);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $(".table > tbody").append(
      $("<tr>").append(
        $("<td>").text(theTrainName),
        $("<td>").text(finalDestin),
        $("<td>").text(tFrequency),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").text(nextTrain)
      )
    );
  }) 
  
  $("#add-user").click(function(event){
    event.preventDefault()
    trains.name = $("#trainName").val()
    trains.destination = $("#destination").val()
    trains.firstTrain = $("#firstTrain").val()
    trains.frequency = $("#frequency").val()
    console.log(trains)
    trainInfo.ref().push(trains)
  });