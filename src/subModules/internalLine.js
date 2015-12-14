/*  global d3  */
import utils from '../utils/utils';

const InternalLine = {

  /**
  @private
  @function Updates the chart's style on the element
  @param {Object} context
    @description Chart object
  @returns {Object} context
    @description Chart object
  */

  styleChart(context) {
    context.element.select('svg')
        .style('font-family', context.getFontStyle)
        .attr('font-size', context.getFontSize)
        .append('text')
        .attr('class', 'title')
        .attr('x', context.getWidth * 0.5)
        .attr('y', 20)
        .text(context.getTitle);
  },

  /**
  @private
  @function Builds up the line
  @returns {Object} context
    @description Chart object
  */

  buildLine(context) {
    context.line = d3.svg.line()
        .x((d) => { return context.xScale(d[context.getxAxisLabel]); })
        .y((d) => { return context.yScale(d[context.getyAxisLabel]); });

    return context;
  },

    /**
    @private
    @function Builds up the y-axis
    @param {Object} context
      @description Chart object
    @returns {Object} context
      @description Chart object
    */

  buildYAxis(context) {
    context.svg.append('g')
             .attr('class', 'y axis')
             .call(context.yAxis)
             .append('text')
             .attr('transform', 'rotate(-90)')
             .attr('y', 6)
             .attr('dy', '.71em')
             .style('text-anchor', 'end')
             .text(context.getyAxisLabel);

    return context;
  },

  /**
  @private
  @function Builds up the line
  @returns {Object} context
    @description Chart object
  */

  setXScale(context) {
    context.xColumnName = utils.getFirstTimeColumn(context.data);
    context.setxAxisLabel = context.xColumnName;
    context.xScale = d3.time.scale()
                    .range([0, context.getWidth]);
    context.xScale.domain(d3.extent(context.data, (d) => { return d.date; }));

    return context;
  },

  /**
  @private
  @function Builds up the line
  @returns {Object} context
    @description Chart object
  */

  setYScale(context) {
    context.yColumnName = utils.getFirstLinearColumn(context.data);
    context.setyAxisLabel = context.yColumnName;
    context.yScale = d3.scale.linear()
                    .range([context.getHeight, 0]);

    context.yScale.domain(d3.extent(context.data, (d) => { return d.close; }));

    return context;
  },

  /**
   @function Builds the actual chart components with data.
   @returns {Object} context
     @description Chart object
   */
  buildChartComponents(context) {
    context.svg.append('path')
            .datum(context.data)
            .attr('class', 'line')
            .style({
              fill: 'none',
              stroke: context.getColors[0],
              'stroke-width': 'crispEdges',
            })
            .attr('d', context.line);

    return context;
  },

  /**
  @private
  @function Update the line on the chart
  @param {Object} context
    @description Chart object
  @returns {Object} context
    @description Chart object
  */

  updateChartComponents(context) {
    context.svg.select('.line').remove();
    context.svg.append('path')
            .datum(context.data)
            .attr('class', 'line')
            .style({
              fill: 'none',
              stroke: context.getColors[0],
              'stroke-width': 'crispEdges',
            })
            .attr('d', context.line);

    return context;
  },

  /**
  @function Updates color of line on chart after initial render
  @param {Array} colors
    @description Array of colors to update the chart to
  */
  updateColors(colors, context) {
    context.element.select('svg')
        .select('.line')
        .style({
          fill: 'none',
          stroke: context.getColors[0],
          'stroke-width': 'crispEdges',
        });

    return context;
  },
};


export default InternalLine;