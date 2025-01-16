let initialMemberDetails = []
for (let i = 0; i < 4; i++) {
  initialMemberDetails.push({
    corporate: false,
    companyName: '',
    firstName: '',
    secondName: '',
    lastName: '',
    proAddress: false,
    street: '',
    suite: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    manager: false
  })
}

const initialManagerDetails = []
for (let i = 0; i < 4; i++) {
  initialManagerDetails.push({
    corporate: false,
    companyName: '',
    firstName: '',
    secondName: '',
    lastName: '',
    proAddress: false,
    street: '',
    suite: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  })
}

const initialPlanValues = (plan) => {
  return {
    fileState: 'Delaware',
    companyNames: {
      name1: '',
      name2: '',
      name3: ''
    },
    denomination: 'LLC',
    industry: {
      industry: '',
      other: ''
    },
    employeeCount: 0,
    companyAddress: {
      proAddress: 'No',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    },
    members: {
      memberCount: '1',
      memberDetails: initialMemberDetails
    },
    managers: {
      managerCount: '0',
      managerDetails: initialManagerDetails
    },
    registeredAgent: {
      proRegisteredAgent: 'No',
      corporateRegisteredAgent: false,
      companyName: '',
      firstName: '',
      secondName: '',
      lastName: '',
      street: '',
      suite: '',
      city: '',
      state: 'Florida',
      zipcode: '',
      country: ''
    },
    addons: {
      ein: false,
      sCorporation: false,
      bankAccount: false,
      attorneyConsultation: false,
      expedited: false
    },
    ein: {
      firstName: '',
      secondName: '',
      lastName: '',
      ssn: '',
      itin: ''
    }
  }
}

export default initialPlanValues
