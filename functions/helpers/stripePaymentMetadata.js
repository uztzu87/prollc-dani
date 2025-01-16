const stripePaymentMetadata = (values) => {

  const companyNames = (
    `1: ${values.companyNames.name1} -- ` +
    `2: ${values.companyNames.name2} -- ` +
    `3: ${values.companyNames.name3}`
  )

  const industry = (
    values.industry.industry === 'Otro'
      ? `Other: ${values.industry.other}` 
      : values.industry.industry
  )

  const companyAddress = (
    values.companyAddress.proAddress === 'Yes'
      ? 'Pro Address'
      : `${values.companyAddress.street}` +
        `${values.companyAddress.suite ? ` ${values.companyAddress.suite}` : ''}` +
        `, ${values.companyAddress.city}` +
        `, ${values.companyAddress.state}` +
        `, ${values.companyAddress.zipcode}` +
        `, ${values.companyAddress.country}`
  )

  const members = () => {
    const { memberCount, memberDetails } = values.members

    const membersObj = {}
    for (let i = 0; i < +memberCount; i++) {

      let memberValues = ''

      if (memberDetails[i].corporate) {
        memberValues += `${memberDetails[i].companyName} -- `
      } else {
        memberValues += (
          `${memberDetails[i].firstName} ` +
          `${memberDetails[i].secondName ? `${memberDetails[i].secondName} ` : ''}` +
          `${memberDetails[i].lastName} -- `
        )
      }

      if (memberDetails[i].proAddress) {
        memberValues += 'Pro Address'
      } else {
        memberValues += (
          `${memberDetails[i].street}` +
          `${memberDetails[i].suite ? ` ${memberDetails[i].suite}` : ''}` +
          `, ${memberDetails[i].city}` +
          `, ${memberDetails[i].state}` +
          `, ${memberDetails[i].zipcode}` +
          `, ${memberDetails[i].country}`
        ) 
      }

      memberDetails[i].corporate ? memberValues += ' (Corporation)' : ''

      membersObj[`Member ${i + 1}`] = memberValues
    }

    return membersObj
  }

  const managers = () => {
    // Members that are also managers
    const memberManagers = []
    values.members.memberDetails.forEach(member => {
      member.manager && memberManagers.push(member)
    })

    const nonEmptyManagers = []
    values.managers.managerDetails.forEach(manager => {
      (manager.firstName || manager.companyName) && nonEmptyManagers.push(manager)
    })

    const managers = [...memberManagers, ...nonEmptyManagers]

    const managersObj = {}
    for (let i = 0; i < managers.length; i++) {

      let managerValues = ''

      if (managers[i].corporate) {
        managerValues += `${managers[i].companyName} -- `
      } else {
        managerValues += (
          `${managers[i].firstName} ` +
          `${managers[i].secondName ? `${managers[i].secondName} ` : ''}` +
          `${managers[i].lastName} -- `
        )
      }

      if (managers[i].proAddress) {
        managerValues += 'Pro Address'
      } else {
        managerValues += (
          `${managers[i].street}` +
          `${managers[i].suite ? ` ${managers[i].suite}` : ''}` +
          `, ${managers[i].city}` +
          `, ${managers[i].state}` +
          `, ${managers[i].zipcode}` +
          `, ${managers[i].country}`
        ) 
      }

      managers[i].corporate ? managerValues += ' (Corporation)' : ''

      managersObj[`Manager ${i + 1}`] = managerValues
    }

    return managersObj
  }

  const registeredAgent = () => {
    const { registeredAgent } = values

    if (registeredAgent.proRegisteredAgent === 'Yes') return 'Pro Registered Agent'
  
    let agentValues = ''

    if (registeredAgent.corporateRegisteredAgent) {
      agentValues += `${registeredAgent.companyName} -- `
    } else {
      agentValues += (
        `${registeredAgent.firstName} ` +
        `${registeredAgent.secondName ? `${registeredAgent.secondName} ` : ''}` +
        `${registeredAgent.lastName} -- `
      )
    }

    agentValues += (
      `${registeredAgent.street}` +
      `${registeredAgent.suite ? ` ${registeredAgent.suite}` : ''}` +
      `, ${registeredAgent.city}` +
      `, ${registeredAgent.state}` +
      `, ${registeredAgent.zipcode}` +
      `, ${registeredAgent.country}`
    )

    registeredAgent.corporate ? agentValues += ' (Corporation)' : ''

    return agentValues
  }

  const ein = (
    `${values.ein.firstName} ` +
    `${values.ein.secondName ? `${values.ein.secondName} ` : ''}` +
    `${values.ein.lastName}` +
    `${values.ein.ssn ? ` -- SSN: ${values.ein.ssn}` : ''}` +
    `${values.ein.itin ? ` -- ITIN: ${values.ein.itin}` : ''}`
  )

  const metadata = {
    'File State': values.fileState,
    'Company Names': companyNames,
    'Denomination': values.denomination,
    'Industry': industry,
    'Employee Count': values.employeeCount,
    'Company Address': companyAddress,
    ...(values.members.memberCount === '5+' ? {'Members': '5+'} : {...members()}),
    ...managers(),
    ...(values.managers.managerCount === '5+' && {'Managers': '5+'}),
    'Registered Agent': registeredAgent(),
    ...(values.addons.ein && {'EIN': ein})
  }

  return metadata
}

module.exports = stripePaymentMetadata