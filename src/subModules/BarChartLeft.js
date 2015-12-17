import { ChartMain } from '../core/ChartMain';
import Internal from './internal';
import InternalBar from '../internal-charts/internalBar';
import InternalBarLeft from './InternalBarLeft';

/**
Constructor subclass for Left Bar Chart.
*/
export class BarChartLeft extends ChartMain {
  constructor(xAxisOrientation, yAxisOrientation) {
    super();
    this._xAxisOrientation = xAxisOrientation || 'bottom';
    this._yAxisOrientation = yAxisOrientation || 'left';
  }

  /**
  @private
  @function build
  @description Builds up the bar chart
  @returns {Object} context Chart object
  */

  build() {
    /*
    Calls each of the methods on Internal and InternalBar object necessary to build up all the components of the chart. Internal holds all the methods that do d3 manipulation to create and update various parts of the chart
    */
    Internal.selectElement(this);
    InternalBarLeft.setXscale(this);
    InternalBarLeft.setYscale(this);
    Internal.createSVGElement(this);
    Internal.createToolTip(this);
    InternalBarLeft.createxAxis(this);
    InternalBarLeft.buildXAxis(this);
    InternalBarLeft.createyAxis(this);
    InternalBarLeft.buildYAxis(this);
    Internal.setAxisStyle(this, 'path', 'none', '#000', 'crispEdges');
    Internal.setAxisStyle(this, 'line', 'none', '#000', 'crispEdges');
    InternalBarLeft.buildChartComponents(this);
    InternalBar.styleChart(this);

    return this;
  }

  /**
  @private
  @function render
  */

  render() {
    // used for data updates?
    // need to think about how we are "rendering" upon instantiation and upon update
    // I think this render needs to be a customized update function depending on what attribute is being updated
  }

  /**
  @private
  @function updateChartComponents
  @description Calls InternalBar to updates the bar on chart
  @returns {Object} this Chart object
  */

  updateChartComponents() {
    /* Calls method on InternalBarLeft to recreate all the chart components. Used to reflect any changes made to property values (e.g. font-size, axis-label, etc.)
    */
    InternalBarLeft.updateChartComponents(this);

    return this;
  }

  /**
  @private
  @function updateHeight
  @description Updates the chart's height on the element itself
  @returns {Object} context Chart object
  */

  updateHeight() {
    /*
    Calls each of the methods on Internal and InternalBarLeft object necessary to update the height of the chart. Internal holds all the methods that do d3 manipulation to create and update various parts of the chart
    */
    Internal.updateSVGElement(this);
    InternalBarLeft.setYscale(this);
    Internal.updateYAxisScale(this);
    Internal.updateYAxis(this);
    Internal.updateXAxisPosition(this);

    return this;
  }

  /**
  @private
  @function updateMargins
  @description Updates the chart's margin on the element itself
  @returns {Object} context Chart object
  */

  updateMargins() {
    /*
    Calls updateHeight and updateWidth on this instance to reflect the new margins.
    */
    this.updateHeight();
    this.updateWidth();

    return this;
  }
  /**
  @private
  @function updateWidth
  @description Updates the chart's width on the element itself
  @returns {Object} context Chart object
  */

  updateWidth() {
    /*
    Calls each of the methods on Internal and InternalBarLeft object necessary to update the width of the chart. Internal holds all the methods that do d3 manipulation to create and update various parts of the chart
    */
    Internal.updateSVGElement(this);
    InternalBarLeft.setXscale(this);
    Internal.updateXAxisScale(this);
    Internal.updateXAxis(this);

    return this;
  }

  /**
  @private
  @function updateColors
  @description Calls InternalBar to update color of left bar chart after initial render
  @param {Array} colors Array of colors to update the chart to
  @returns {Object} context Chart object
  */

  updateColors(colors) {
    /*
    Calls InternalBar object to update the colors on the bar chart. InternalBar does the d3 manipulation
    */
    InternalBar.updateColors(colors, this);

    return this;
  }

}