describe("Namespace Tests", function() {
  var sourceJS = "temp/bootstrap-slider.js";

  beforeEach(function() {
    runs(function() {
      $.fn.slider = function() {};
    });
  });

  it("sets the plugin namespace to be 'bootstrapSlider' if $.fn.slider is already defined", function() {
    var scriptLoaded;

    runs(function() {
      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });

    runs(function() {
      expect($.fn.bootstrapSlider).toBeDefined();
    });
  });

  afterEach(function() {
    /*
      Set the namespaces back to undefined and reload slider
      So that namespace is returned to $.fn.slider
    */
    var scriptLoaded;

    runs(function() {
      $.fn.bootstrapSlider = undefined;
      $.fn.slider = undefined;

      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });
  });
});