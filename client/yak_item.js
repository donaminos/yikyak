Template.yakItem.helpers({
	commentsCount: function() {
    	return Comments.find({postId:this._id}).count();
  	}
})

Template.yakItem.events({
	'click': function(){
		Session.set('selected_yak', this._id);
	},
	'click a.yes': function(){
		
		if( Meteor.user()){
			var yak = Yaks.findOne({_id: this._id});
			console.log(yak);
			if( $.inArray(Meteor.userId(), yak.voted) !== -1 ){
				alert("Already voted!");
			}else{
				var yakId = Session.get('selected_yak');
				Yaks.update(yakId, {$inc: {score: 1}});
				Yaks.update(yakId, {$addToSet: {voted : Meteor.userId()}});
			}
		}
	},
	'click a.no': function(){
	   if (Meteor.user()) {
	      var yak = Yaks.findOne({_id:this._id})
	      if ($.inArray(Meteor.userId(), yak.voted) !== -1) {
	        alert("Already voted!");
	      } else {
	        var yakId = Session.get('selected_yak');
	        Yaks.update(yakId, {$inc: {'score': -1 }});
	        Yaks.update(yakId, {$addToSet: {voted : Meteor.userId()}});
	        if (postId.score <= -3) {
	          Yaks.remove({_id:this._id})
	        }
	      }
	    }
	}
});