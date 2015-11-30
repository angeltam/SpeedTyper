// Bar graph view for the KeyPressModel
var KeyPress_WowView = Backbone.View.extend({

  // Set DOM tag
  tagName: 'div',

  // Initialize
  /*data: {
      domID: '#someID',
      model: some_KeyPressModel_instance
    }
   */
  initialize: function (data) {
    // Set domID
    this.domID = data.domID;
    // Set graph ids
    this.wowIDs = [
      '#WowView_Left',
      '#WowView_Right'
    ];
    // Wow compliments
    this.wowCompliments = [
      'Exquisite', 'Scrumptious', 'Grand', 'Brehhh', 'Bro',
      'Dude', 'Dudebrohh', 'Spell-Tastrophe', 'Kiss My ASCII'
    ];
    this.wowInsults = [
      'GoBack_2_AppAcademy', 'Syntax error: Missing Skill',
      'Fatal Error: You\'re bad',
      'PHPlease', 'expect(you).to.have\n.property(\'skill\')'
    ];

    // Add listeners
    this.initializeListeners();

    // Initialize view
    this.initializeWowView();

    // Constantly reanimate
    var that = this;
  },

  // Initialize all listeners for model changes
  initializeListeners: function () {
    // On a keypress change, animate the data
    var that = this;
    this.model.on('updateOneKeyPress', function (key, bool) {
      // Animate an individual bar
      if (key === ' ' && bool
        || !bool) {
        that.animateOneWow(key, bool);
      }
    });
  },

  // Initialize graphs
  initializeWowView: function () {
    // Make initial element
    d3.select('body')
      .append(this.tagName)
      .attr('id', this.domID.replace('#', ''))
      .style('position', 'absolute')
      .style('top', '0')
      .style('margin-top', '25vh')
      .style('width', '100%')
      .style('height', '70vh');
    
    // Append two divs corresponding to wowAreas
    d3.select('body ' + this.domID)
      .selectAll('div')
      .data(this.wowIDs)
      .enter()
      .append('div')
      .attr('id', function (d) {
        return d.replace('#', '');
      })
      .style('height', '100%')
      .style('width', '15%')
      .style('float', function (d, i) {
        if (i === 1) {
          return 'right';
        }
        return 'left';
      });
  },

  // Animate an individual wow
  animateOneWow: function (key, bool) {
    // This binding
    var that = this;

    // Get keyPressData
    var keyPressData = this.model.get('keyPressData');

    // Get random wowDiv index
    var wowID = this.wowIDs[Math.floor(Math.random()
      * this.wowIDs.length)];

    // Get a text array
    var textArr;
    var compliment = true;
    // Compliment
    if (bool) {
      textArr = this.wowCompliments;
    } else {
      // Insult
      textArr = this.wowInsults;
      compliment = false;
    }

    // Get a random element
    var str = textArr[Math.floor(Math.random()
      * textArr.length)];
    console.log(str);
    console.log('body');
    // Add element to DOM
    d3.selectAll('body ' + this.domID + ' ' + wowID)
      .append('p')
      .text(str)
      .style('font-size', function () {
        return Math.floor(16 + Math.random() * 8) + 'px';
      })
      .style('color', function () {
        if (!compliment) {
          return 'red';
        }
        return 'green'
      })
      .style('opacity', '0')
      .style('position', 'relative')
      .style('left', function () {
        return 10 + Math.random() * 30 + '%';
      })
      .style('top', function () {
        return 10 + Math.random() * 40 + '%';
      })
      .transition()
      .duration(250)
      .style('opacity', '1')
      .style('transform', function () {
        return 'rotatez('
          + Math.floor(90 * (Math.random() - .5))
          + 'deg)';
      })
      .style('-ms-transform', function () {
        return 'rotatez('
          + Math.floor(90 * (Math.random() - .5))
          + 'deg)';
      })
      .style('-webkist-transform', function () {
        return 'rotatez('
          + Math.floor(90 * (Math.random() - .5))
          + 'deg)';
      })
      .transition()
      .duration(2000)
      .transition()
      .duration(250)
      .style('opacity', '0')
      .each('end', function () {
        d3.select(this)
          .remove();
      });
  }
});
