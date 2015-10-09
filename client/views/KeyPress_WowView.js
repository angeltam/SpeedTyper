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
    this.model.on('updateOneKeyPress', function (key) {
      // Animate an individual bar
      that.animateWow(key);
    });
  },

  // Initialize graphs
  initializeWowView: function () {
    // Make initial element
    d3.select('body')
      .append(this.tagName)
      .attr('id', this.domID.replace('#', ''))
      .style('color', 'red')
      .style('background-color', 'rgba: (255, 0, 0, .5)')
      .style('margin-top', '20vh')
      .style('width', '100%')
      .style('height', '80vh');
    
    // // Append scale text
    // var scaleVars = ['Poor', 'Good'];
    // d3.select('body ' + this.domID)
    //   .append('ul')
    //   .style('list-style-type', 'none')
    //   .style('margin', '0')
    //   .style('padding', '0')
    //   .selectAll('li')
    //   .data(scaleVars)
    //   .enter()
    //   .append('li')
    //   .attr('class', 'barGraphView_ScaleTitle')
    //   .text(function (d) {
    //     return d;
    //   });

    // // Append gradient scale
    // d3.select('body ' + this.domID)
    //   .append('div')
    //   // Background image gradient
    //   .style('background-image',
    //     'linear-gradient(to right, '
    //       + this.model.get('heatMapColors').badColor.color
    //       + ', '
    //       + this.model.get('heatMapColors').goodColor.color
    //       + ')')
    //   // Safari
    //   .style('background-image',
    //     '-webkit-linear-gradient(left, '
    //       + this.model.get('heatMapColors').badColor.color
    //       + ', '
    //       + this.model.get('heatMapColors').goodColor.color
    //       + ')')
    //   // Opera
    //   .style('background-image',
    //     '-o-linear-gradient(right, '
    //       + this.model.get('heatMapColors').badColor.color
    //       + ', '
    //       + this.model.get('heatMapColors').goodColor.color
    //       + ')')
    //   // Firefox
    //   .style('background-image',
    //     '-moz-linear-gradient(right, '
    //       + this.model.get('heatMapColors').badColor.color
    //       + ', '
    //       + this.model.get('heatMapColors').goodColor.color
    //       + ')')
    //   // General styling
    //   .style('width', '25%')
    //   .style('height', '20px')
    //   .style('margin', '1% auto')
    //   .style('border-radius', '5px');

    // // Iterate over graph ids
    // var graphIDs = this.graphIDs;
    // for (var i = 0; i < graphIDs.length; ++i) {
    //   // Select parent in DOM
    //   d3.select('body ' + this.domID)
    //     // Add div
    //     .append('div')
    //     // Add class
    //     .attr('class', 'barGraphView_Graph')
    //     // Add id
    //     .attr('id', graphIDs[i].replace('#', ''));
    //   // Add bottom margin to last element
    //   if(i === graphIDs.length - 1) {
    //     d3.select('body ' + graphIDs[i])
    //       .style('margin-bottom', '2%');
    //   }
    // }
  },

  // Animate an individual wow
  animateOneWow: function (key) {
    // This binding
    var that = this;

    // Get keyPressData
    var keyPressData = this.model.get('keyPressData');

    // Height of containing div
    var containerHeight = Number(d3
      .selectAll(this.graphIDs[0])
      .style('height').replace('px', ''));

    // Bar DOM id
    var barID = '#barGraphView_Graph_BarID_'
      + key.charCodeAt(0);

    // Animate the bar
    d3.select('body ' + barID)
      // Transition
      .transition()
      .duration(100)
      // Calculate height based off of occurence
      .style('height', function () {
        var totalPresses = keyPressData[key].goodPresses
          + keyPressData[key].badPresses;
        var barHeight
          = (keyPressData[key].goodPresses/totalPresses * .6 + .3)
            * containerHeight;
        return barHeight + 'px';
      })
      // Calculate color based on heat mapping
      .style('background-color', function () {
        // Get all presses
        var totalPresses = keyPressData[key].badPresses
          + keyPressData[key].goodPresses;
        // Avoid division by 0
        if (!totalPresses) {
          return that.model.get('heatMapColors').goodColor.color;
        }
        // Get bad press ratio mapping
        var badPressRatio
          = keyPressData[key].badPresses / totalPresses;
        return that.model.interpretToColor_Dynamic(badPressRatio);
      });
  }
});
