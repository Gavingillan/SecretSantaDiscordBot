const Discord = require('discord.js');
const client = new Discord.Client();
const clientKey = "";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var keyPhrase='$$';
var users= [];

client.on('message', msg => {
  if (msg.content.toLowerCase() == keyPhrase + 'join') {
    var user= msg.author
    //console.log( userID + 'has joined');
    var spotTaken=false;
    for(var i=0;i<users.length;i++){
        if (user===users[i]){
            spotTaken = true;
        }
    }
    if(!spotTaken){
        users.push(user);
        msg.channel.send("<@"+user + '>' + " has joined the Secret Santa list");
    } else{
        msg.channel.send("<@"+user+ '>' + " you have already joined the list");
    }
  }
});

client.on('message', msg => {
    if (msg.content.toLowerCase() == keyPhrase + 'listparticipants') {
      chat='List of Participants: \n';
      console
      chat += printArray(users);
      if (chat.length === 24){
          msg.channel.send('There is nobody in the Secret Santa Yet');
      } else{
          msg.channel.send(chat);
      }
    }
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === keyPhrase + "start"){
        if(msg.member.permissions.has('ADMINISTRATOR')) {
            if(users.length>0){
                msg.channel.send("SECRET SANTA HAS STARTED");
                console.log("OLD LIST");
                console.log(printArray(users));
                shuffle(users);
                console.log("NEW LIST");
                console.log(printArray(users));
                for(var i=0;i<users.length-1;i++){
                    //console.log(users[i].username + 'is getting a gift for ' + users[i+1].username);
                    users[i].send("you are getting a gift for: " + users[i+1].username);
                }
                users[users.length-1].send('you are getting a gift for: ' + users[0].username);
            }else{
                msg.channel.send('there are not enough users for Secret Santa yet');
            }
        } else{
            msg.channel.send("<@"+ msg.author + '>' + 'You do not have access to this command!');
        }
    } 
});



function printArray(array){
    var people = ''
    for(var user of array){
            people+= user.username + '\n';
    }
    return people;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


client.login(clientKey);