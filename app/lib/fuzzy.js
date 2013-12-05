// Calculate performance
var getPerformanceOfComputer = function(options){

  var _opts_ = options;

  // Calculating performance of computer
  function normalize(opts){
    var processor = null,
        ozu = null,
        video = null,
        memory = null;

    // calculating processor performance
    processor = opts.processor.performance;
    if(opts.processor.type == 'i3'){
      processor *= 1.3;
    }
    if(opts.processor.type == 'i5'){
      processor *= 1.7;
    }
    else if(opts.processor.type == 'i7'){
      processor *= 2.1;
    }

    // calculating ozu performance
    ozu = opts.ozu.performance;
    if(opts.ozu.type == 'DDR2')
      ozu *= 1.2;
    else if(opts.ozu.type == 'DDR3')
      ozu *= 1.5;

    // calculating video preformance
    video = opts.video.performance;

    // calculating memory performance
    memory = opts.memory.performance;
    if(opts.memory.type == 'SSD'){
      memory *= 5;
    }

    return {
      processor : processor,
      ozu: ozu,
      video: video,
      memory: memory
    }
  }

  // set name
  function getName(opts){
    return "Processor is " + opts.processor.type + ' with ' + opts.processor.performance + 'HZ' +
           ", Ozu is " + opts.ozu.type + ' with ' + opts.ozu.performance + 'MB' +
           ", Video is " + opts.video.performance + 'MB' +
           ", Memory is " + opts.memory.type + ' with ' + opts.memory.performance + 'MB';
  }

  // Formula for performance
  function calc(opts){
    return 0.4 * opts.processor + 0.2 * opts.ozu + 0.25 * opts.video + 0.15 * opts.memory;
  }

  var results = normalize(_opts_);
      results = calc(results);

  return {
    name : getName(_opts_),
    result : results
  }
}

// Next
var types = {};
types.budget = {
  rise : {
    start : 500,
    end : 1000
  },
  full : {
    start : 1000,
    end : 1500
  },
  end : {
    start : 1500,
    end : 2000
  }
};
types.office = {
  rise : {
    start : 1500,
    end : 2000
  },
  full : {
    start : 2000,
    end : 2500
  },
  end : {
    start : 2500,
    end : 3000
  }
};
types.multimedia = {
  rise : {
    start : 2500,
    end : 3000
  },
  full : {
    start : 3000,
    end : 3500
  },
  end : {
    start : 3500,
    end : 4000
  }
};
types.game = {
  rise : {
    start : 3500,
    end : 4500
  },
  full : {
    start : 4500,
    end : 5000
  },
  end : {
    start : 5000,
    end : 5500
  }
};
types.super = {
  rise : {
    start : 5000,
    end : 5500
  },
  full : {
    start : 5500,
    end : 10000
  },
  end : {
    start : 10000,
    end : 15500
  }
};


var weight_types = {};
weight_types['lightweight'] = {
  rise : {
    start : 1000,
    end : 1000
  },
  full : {
    start : 1000,
    end : 1500
  },
  end : {
    start : 1500,
    end : 2000
  }
};
weight_types['middleweight'] = {
  rise : {
    start : 1500,
    end : 2000
  },
  full : {
    start : 2000,
    end : 2600
  },
  end : {
    start : 2600,
    end : 3200
  }
}
weight_types['heavyweight'] = {
  rise : {
    start : 2800,
    end : 3400
  },
  full : {
    start : 3400,
    end : 6000
  },
  end : {
    start : 6000,
    end : 10000
  }
}


function getMembershipValue(value, _type_){
  if(value >= _type_.full.start && value <= _type_.full.end){
    return 1;
  }

  // otherwise
  var start = end = del = to_type = null;

  if(value >= _type_.rise.start && value <= _type_.rise.end){
    start  = _type_.rise.start;
    end    = _type_.rise.end;
    del = end - start;
    to_type = 'rise';
  }
  else if(value >= _type_.end.start && value <= _type_.end.end){
    start = _type_.end.start;
    end = _type_.end.end;
    del = end - start;
    to_type = 'down';
  }

  if(start && end && del){
    if(to_type == 'rise')
      return (value - start) / del;
    else
      return (end - value) / del;
  }

  // no case find
  return 0;
}


module.exports = {
  calculatePerformanceOfComputer : getPerformanceOfComputer,
  computerTypes : types,
  weightTypes : weight_types,
  memberShipValue : getMembershipValue
}