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
      'Good', 'Great', 'Grand', 'Brehhh', 'Bro', 'Dude',
      'Dudebro', 'Bropocalypse', 'Spell-Tastrophe',
      'Kiss My ASCII'
    ];
    this.wowInsults = [
      'Uhm...', 'Huh?', 'Awful', 'Lame',
      'WPM = WrongPerMinute', 'Fatal Error: You\'re bad',
      'Do you even type?'
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
      that.animateOneWow(key, bool);
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
      .style('height', '80vh');
    
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
      .style('width', '20%')
      .style('float', function (d, i) {
        if (i === 1) {
          return 'right';
        }
        return 'left';
      })
      .style('background-color', function (d, i) {
        if (i === 1) {
          return 'rgba(0, 255, 0, .1)';
        }
        return 'rgba(0, 0, 255, .1)';
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
        return Math.floor(10 + Math.random() * 25) + 'px';
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
        return 10 + Math.random() * 80 + '%';
      })
      .style('top', function () {
        return 10 + Math.random() * 80 + '%';
      })
      .transition()
      .duration(500)
      .style('opacity', '1')
      .style('transform', function () {
        return 'rotatez('
          + Math.floor(180 * Math.random() - 1))
          + 'deg)';
      })
      .style('-ms-transform', function () {
        return 'rotatez('
          + Math.floor(180 * Math.random() - 1))
          + 'deg)';
      })
      .style('-webkist-transform', function () {
        return 'rotatez('
          + Math.floor(180 * Math.random() - 1))
          + 'deg)';
      })
      .transition()
      .duration(250)
      .transition()
      .duration(500)
      .style('opacity', '0')
      .style('transform', function () {
        return 'rotatex('
          + Math.floor(720 * Math.random() - 1))
          + 'deg)';
      })
      .style('-ms-transform', function () {
        return 'rotatex('
          + Math.floor(720 * Math.random() - 1))
          + 'deg)';
      })
      .style('-webkist-transform', function () {
        return 'rotatex('
          + Math.floor(720 * Math.random() - 1))
          + 'deg)';
      })
      .each('end', function () {
        d3.select(this)
          .remove();
      });
  }
});
