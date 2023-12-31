export const idRule = (droneId: string) => ({
  [droneId]: {
    presence: true,
    format: {
      pattern: '^[0-9a-fA-F]{24}$'
      //   message: 'Invalid Drone ID format'
    }
  }
});

export const nameRule = (name: string) => ({
  [name]: {
    presence: true,
    length: {
      minimum: 3
    },
    format: {
      pattern: '^[A-Za-z0-9-_]+$'
    }
  }
});

export const weightRule = {
  weightLimit: {
    presence: true,
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 500,
      onlyInteger: true
    }
  }
};

export const codeRule = (code: string) => ({
  [code]: {
    presence: true,
    length: {
      minimum: 1
    },
    format: {
      pattern: '^[A-Z0-9_]+$',
      message: 'allows only upper case letters, underscore and numbers'
    }
  }
});

export const serialNumberRule = (serialNumber: string) => ({
  [serialNumber]: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 100
    }
  }
});

export const modelRule = (model: string) => ({
  [model]: {
    presence: true,
    format: {
      pattern: '^(Lightweight|Middleweight|Cruiserweight|Heavyweight)$',
      flag: 'i'
    }
  }
});

export const stateRule = (state: string) => ({
  [state]: {
    presence: true,
    format: {
      pattern: '^(IDLE|LOADING|LOADED|DELIVERING|DELIVERED|RETURNING)$',
      flag: 'i'
    }
  }
});
