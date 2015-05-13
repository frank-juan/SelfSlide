App.Views.LoginPopup = Backbone.View.extend({
	el: '#app-wrapper',

	initialize: function() { 
    this.loginTemplate = Handlebars.compile( $('#login-template').html() );
  },
	render: function() {
    this.$el.html(this.loginTemplate);
    console.log('login popup');
	},
	events: {
		'click #login-btn': 'login',
		'click #create-account-btn': 'signup',
	},
	showPopup: function() {
    this.$el.fadeIn(1000);
  },
  hidePopup: function() {
    this.$el.empty; 
    // App.router.navigate("preview_one", {trigger: true, replace: true})
  },
	login: function(){
    var username = $('#login-username').val();
    var password = $('#login-password').val();

    $.post('/sessions',{
      username: username,
      password: password
    }).done(this.renderSession.bind(this))
      .done(this.hidePopup.bind(this))
        .fail(function(response) {
        var err = response.responseJSON;
        alert(err.err + ' - ' + err.msg);
    });
  },
  renderSession: function(userData) {
    var currentUser = new App.Models.User(userData);
    App.createPresentation = new App.Views.CreatePresentation({model: currentUser});
    App.createPresentation.render();
    // App.router.navigate("home", {trigger: true})
  },
  signup: function() {
    var username = $('#create-username').val();
    var password = $('#create-password').val();
    var name = $('#create-name').val();

    $.post('/users', {
      username: username,
      password: password,
      name: name
    }).done(this.createUser.bind(this));
  },

  createUser: function() {
    $("#create-account-box").prepend("<h3>Account Created!</h3>")
    $("h3").attr("class", "on-create");
    $(".on-create").fadeOut(3000);
        //$('#session').html(this.loginTemplate());
  },

});
