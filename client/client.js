Template.yaksList.helpers({
  yaks: function() {
    return Yaks.find({}, {score: -1});
  }
});

Template.yaksSubmit.events({
	'submit .yaksSubmitForm': function(event){
		event.preventDefault();
		var yak = event.target.yak.value;

		if( yak == ""){
			alert("You can't inset an empty yak!");
		}else{
			Meteor.call('yakInsert', yak);
			Router.go('yaksList');
		}
	}
});