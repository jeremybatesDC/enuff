(function () {

  var Countastic = function (options) {
    this._init(options);
  };

  Countastic.prototype = {

    _settings: {
      countable:            null,             // 
      counter:              "#counter",       // Id of counter
      button:               "#counter-btn",   // Button for disable and enable callback
      maxCount:             140,              // Maximum limit of chars
      warningCount:         20,               // Warning point
      strictMax:            false,            // If true, will trigger a callback
      countDirection:       'down',           // Decrement or Increment
      successClass:         'success',        // CSS class before reaching maxCount
      warningClass:         'warning',        // CSS class when warning reached
      alertClass:           'alert',          // CSS class after reaching maxCount
      onWarning:            function(){},     // Do whatever you like on warning
      onSuccess:            function(){},     // Do whatever you like on success
      onMaxCount:           function(){}      // Do whatever you like when exactly maxCount
    },

    _init: function (options) {
      this._settings = this.merge(this._settings, options);

      var countable = document.querySelector(this._settings.countable);

      // Throw an error if countable textfield is not on the DOM
      if (!countable) {
        throw new Error('missing parameters: countable input field');
      }

      var counter = document.querySelector(this._settings.counter);

      if (!counter) {
        throw new Error('missing parameters: counter');
      }

      this.attachEventHandlers(counter, countable);
    },

    merge: function (obj1, obj2) {
      var obj3 = {},
          attrname;
      for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    },

    attachEventHandlers: function (counter, countable) {
      countable.addEventListener('keyup', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
      countable.addEventListener('keydown', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
      countable.addEventListener('keypress', (function () { setTimeout(this.refreshCounter(counter, countable), 5); }).bind(this, false) );
      countable.addEventListener('remove', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
      countable.addEventListener('change', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
      countable.addEventListener('focus', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
      countable.addEventListener('select', (function () { this.refreshCounter(counter, countable); }).bind(this, false) );
    },

    refreshCounter: function (counter, countable) {
      var count, revCount, maxCount, strictMax, button;

      maxCount = this._settings.maxCount;
      strictMax = this._settings.strictMax;

      button = document.querySelector(this._settings.button);

      // Count by characters
      count = maxCount - countable.value.length; 
      revCount = this.reverseCount(count);

      // If strictMax set restrict further characters
      if (strictMax && count <= 0){
        if (count < 0) {
          this._settings.onMaxCount(this.countInt(revCount, count), this, counter);
        }
      }

      // We change the value of the counter
      counter.innerHTML = this.numberFormat(this.countInt(revCount, count));

      this.setCssAndCallbacks(count, this._settings);
    },

    reverseCount: function (val) {
      return val - (val * 2) + this._settings.maxCount;
    },

    countInt: function (revCount, count) {
      return (this._settings.countDirection === 'up') ? revCount : count;
    },

    numberFormat: function (val) {

      val += '';
      splitted = val.split('.');
      x = splitted[0];
      y = splitted.length > 1 ? '.' + splitted[1] : '';
      var regex = /(\d+)(\d{3})/;

      while (regex.test(x)) {
        x = x.replace(regex, '$1' + ',' + '$2');
      }

      return x + y;
    },

    enableButton: function(button) {
      if (!button) { return false; }   
      else { button.disabled = false; }
    },

    disableButton: function(button) {
      if (!button) { return false; }
      else { button.disabled = true; }
    },

    // Set CSS class rules and callbacks
    //
    
    setCssAndCallbacks: function (count, settings) {
      var counter = document.querySelector(settings.counter);
      var button = document.querySelector(settings.button);
      var revCount = this.reverseCount(count);
      
      if (count == settings.maxCount) { 
        counter.classList.remove(settings.alertClass);
        counter.classList.add(settings.successClass);
      }

      if (!counter.classList.contains(settings.successClass) && !counter.classList.contains(settings.alertClass) && !counter.classList.contains(settings.warningClass)) {
        if (count > settings.warningCount && count > 0) { counter.classList.add(settings.successClass); }
        else if (count > 0 && count <= settings.warningCount) { counter.classList.add(settings.warningClass); }
        else if (count <= 0) { counter.classList.add(settings.alertClass); }
      }

      else if (count > 0 && count <= settings.warningCount) {
        if (counter.classList.contains(settings.successClass)) {
          counter.classList.remove(settings.successClass);
          counter.classList.add(settings.warningClass);
        }
        else if (counter.classList.contains(settings.alertClass)) {
          counter.classList.remove(settings.alertClass);
          counter.classList.add(settings.warningClass);
        }
        settings.onWarning(this.countInt(revCount, count), this, counter);
        this.enableButton(button);
      }

      else if (count <= 0 && counter.classList.contains(settings.warningClass)) {
        counter.classList.remove(settings.warningClass);
        counter.classList.add(settings.alertClass);
        settings.onMaxCount(this.countInt(revCount, count), this, counter);
        this.disableButton(button);
      }

      else if (count > settings.warningCount && counter.classList.contains(settings.warningClass)) {
        counter.classList.remove(settings.warningClass);
        counter.classList.add(settings.successClass);
        settings.onSuccess(this.countInt(revCount, count), this, counter);
        this.enableButton(button);
      }
    }
  };

  this.Countastic = Countastic;

})();
