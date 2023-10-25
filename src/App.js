
import { useEffect, useState } from 'react';
import './App.css';


function App() {



  // currDate
  const currDate = () => {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    return `${date}/${month}/${year}`
  }

  let date = currDate();
  //  state
  const [LCInfo, setLCInfo] = useState({
    LCtype: 'irrevocable',
    effectiveDate: date,
    lcCategory: '',
    purpose: '',
    delivaryVai: '',
    expiryDate: '',
    placeOfExpiry: '',
    authorisedBankForTransfer: '',
    resolving: 'NO',
    currency32B: '',
    amount: '',
    maxMinTolerancePercentage: '',
    additionalAmount: '',
    redclause: 'NO',
    advanceAmount: '',
    normalCurrency: '',
    reinstatementType: 'Manual',
    noofRevolvements: '',
    maxDrawingAmount: '',
    creditAvailable: '',
    creditAvailableWith: '',
    additionalDetailCreditAvailableWith: '',
    creditAvailableBy: 'acceptance',
    deferredPaymentDetails: '',
    tenorPeriodDays: '',
    tenorIndicator: '',
    drawee: '',
    confirmationOfCredit49: '',
    additionalDetailCreditAvailableWith2: '',
    advisingBank: '',
    addressLine1: ''
  })

  const [displayDrawee, setDisplayDrawee] = useState(true)
  // errors
  const [LCInfoError, setLCInfoError] = useState({
    LCtype: '',
    effectiveDate: '',
    lcCategory: '',
    purpose: '',
    delivaryVai: '',
    expiryDate: '',
    placeOfExpiry: '',
    authorisedBankForTransfer: '',
    resolving: '',
    currency32B: '',
    amount: '',
    maxMinTolerancePercentage: '',
    additionalAmount: '',
    redclause: '',
    advanceAmount: '',
    normalCurrency: '',
    reinstatementType: '',
    noofRevolvements: '',
    maxDrawingAmount: '',
    creditAvailableWith: '',
    additionalDetailCreditAvailableWith: '',
    creditAvailableBy: '',
    deferredPaymentDetails: '',
    tenorPeriodDays: '',
    tenorIndicator: '',
    drawee: '',
    confirmationOfCredit49: '',
    additionalDetailCreditAvailableWith2: '',
    advisingBank: '',
    addressLine1: ''
  })

  //useeffect for for particular change

  useEffect(() => {

    // Functionality For DeliverVai Domestic'
    if (LCInfo.lcCategory === 'Foreign') {

      setLCInfo((prev) => ({
        ...prev, ['placeOfExpiry']: 'In Beneficiary’s country'
      }))


      setLCInfoError((prev) => ({
        ...prev, ['placeOfExpiry']: "",
        ['delivaryVai']: ''
      }))

      setLCInfo((prev) => ({
        ...prev, ['delivaryVai']: 'swift'
      }))

      setLCInfo((prev) => ({
        ...prev, ['creditAvailableWith']: 'AnyBank'
      }))

      setLCInfo((prev) => ({
        ...prev, ['advisingBank']: 'AnyBank'
      }))

    }
    else if (LCInfo.lcCategory === 'Domestic') {

      setLCInfo({ ...LCInfo, ['placeOfExpiry']: 'At Counter of Negotiating Bank' });
      setLCInfoError((prev) => ({
        ...prev, ['placeOfExpiry']: "",
        ['delivaryVai']: ''
      }))

      setLCInfo((prev) => ({
        ...prev, ['delivaryVai']: 'SFMS'
      }))
      setLCInfo((prev) => ({
        ...prev, ['creditAvailableWith']: 'AxisBank'
      }))
      setLCInfo((prev) => ({
        ...prev, ['advisingBank']: ''
      }))

    }
    else if (LCInfo.lcCategory === '') {

      setLCInfo({ ...LCInfo, ['placeOfExpiry']: '' });
      setLCInfoError((prev) => ({
        ...prev, ['placeOfExpiry']: ""
      }))

      setLCInfo((prev) => ({
        ...prev, ['delivaryVai']: ''
      }))

      setLCInfo((prev) => ({
        ...prev, ['creditAvailableWith']: ''
      }))

      setLCInfo((prev) => ({
        ...prev, ['advisingBank']: 'AnyBank'
      }))

    }

  }, [LCInfo.lcCategory])

  useEffect(() => {
    setLCInfo((prev) => ({
      ...prev, ['normalCurrency']: LCInfo?.currency32B,
      ['maxDrawingCurrency']: LCInfo?.currency32B
    }))
    if (LCInfo?.normalCurrency) {
      console.log("kgjgj");
      setLCInfoError((prev) => ({
        ...prev, ['normalCurrency']: ''
      }))

    }
    if (LCInfo?.maxDrawingCurrency) {
      setLCInfoError((prev) => ({
        ...prev, ['maxDrawingCurrency']: ''
      }))

    }

  }, [LCInfo?.currency32B])

  useEffect(() => {
    if (LCInfo?.drawee === "confirmingBank") {
      setLCInfo((prev) => ({
        ...prev, ['confirmationOfCredit49']: 'yes'
      }))
    }
    else if (LCInfo?.drawee === "issuingBank") {
      setLCInfo((prev) => ({
        ...prev, ['confirmationOfCredit49']: ''
      }))
    }
  }, [LCInfo?.drawee])

  useEffect(() => {
    if (LCInfo?.creditAvailableBy === 'acceptance' || LCInfo?.creditAvailableBy === 'negotiation' ||
      LCInfo?.creditAvailableBy === 'payment' || LCInfo?.creditAvailableBy === 'mixedPayment') {
      setDisplayDrawee(true)
    }
    else if (LCInfo?.creditAvailableBy === "deferredPayment") {
      setDisplayDrawee(false)
    }
  }, [LCInfo?.creditAvailableBy])

  useEffect(() => {
    if (LCInfo?.tenorIndicator === "At Sight") {
      setLCInfo((prev) => ({
        ...prev, ['tenorPeriodDays']: ''
      }))
      setLCInfoError((prev)=>({
        ...prev , ['tenorPeriodDays'] :''
      }))
    }
  }, [LCInfo?.tenorIndicator])



  // Additional Amount validation
  const validateAdditionalAmount = (e) => {
    let amount = e.target.value;
    let result = amount?.match(/^[a-zA-Z0-9]+$/)
    if (result === null) {
      setLCInfoError((prev) => ({
        ...prev, ['additionalAmount']: 'Please enter amount alphaNumaric'
      }))
    }
    else {
      setLCInfoError((prev) => ({
        ...prev, ['additionalAmount']: ''
      }))
      handleChange(e)
    }
  }

  // validation for number
  const validateForNumber = (e) => {
    let value = e.target.value;
    let regex = /^[0-9]+$/
    let result = value.match(regex)

    if (result === null) {
      setLCInfoError((prev) => ({
        ...prev, [e.target.name]: 'Please enter numaric'
      }))
    }
    else {
      setLCInfoError((prev) => ({
        ...prev, [e.target.name]: ''
      }))
      handleChange(e)
    }
  }

  // validate tenor Period Days
  const validateTenorPeriodDays = (e) => {
    let value = e.target.value;
    let regex = /^[0-9]+$/
    let result = value.match(regex)

    if (result === null) {
      setLCInfoError((prev) => ({
        ...prev, [e.target.name]: 'Please enter days up to 3 digits'
      }))
    }
    else {
      setLCInfoError((prev) => ({
        ...prev, [e.target.name]: ''
      }))
      handleChange(e)
    }
  }

  const handleChange = (e) => {
    setLCInfo({ ...LCInfo, [e.target.name]: e.target.value })
    setLCInfoError({ ...LCInfoError, [e.target.name]: "" })
  }


  console.log(LCInfo, "LCInfo");

  // handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // validation for LCType mandetory
    const handleLctype = () => {
      if (!LCInfo?.LCtype) {
        setLCInfoError((prev) => ({
          ...prev, ['LCtype']: "Please select LCtype."
        }))
      }

    }
    handleLctype();

    // validation for Effective Date mandetory
    const handleEfectiveDate = () => {
      if (!LCInfo?.effectiveDate) {
        setLCInfoError((prev) => ({
          ...prev, ['effectiveDate']: "there is no effective date"
        }))
      }

    }
    handleEfectiveDate()
    // validation for LCCategory  mandetory
    const handleLCCategory = () => {
      if (!LCInfo?.lcCategory) {
        setLCInfoError((prev) => ({
          ...prev, ['lcCategory']: "Please select lccategory"
        }))
      }

    }
    handleLCCategory()
    // validation for Purpose  mandetory
    const handlePurpose = () => {
      if (!LCInfo?.purpose) {
        setLCInfoError((prev) => ({
          ...prev, ['purpose']: "Please select Purpose"
        }))
      }

    }
    handlePurpose()

    // validation for Purpose  mandetory
    const handleDelevaryVai = () => {
      if (!LCInfo?.delivaryVai) {
        setLCInfoError((prev) => ({
          ...prev, ['delivaryVai']: "Please select Delevary Vai"
        }))
      }

    }
    handleDelevaryVai()

    // validation for Expiry Date
    const handleExpiryDate = () => {
      if (!LCInfo?.expiryDate) {
        setLCInfoError((prev) => ({
          ...prev, ['expiryDate']: "Please select Expiry Date"
        }))
      }

    }
    handleExpiryDate()
    // validation for Place Expiry 
    const handlePlaceOfExpiry = () => {
      if (!LCInfo?.placeOfExpiry) {
        setLCInfoError((prev) => ({
          ...prev, ['placeOfExpiry']: "there is no Place of Expiry"
        }))
      }
      // else if(LCInfo?.placeOfExpiry)
      // {
      //   setLCInfoError((prev) => ({
      //     ...prev, ['placeOfExpiry']: ""
      //   }))
      // }

    }
    handlePlaceOfExpiry()

    // validation for Authorised bank for transfer
    const handleAuthorisedBank = () => {
      if (!LCInfo?.authorisedBankForTransfer) {
        setLCInfoError((prev) => ({
          ...prev, ['authorisedBankForTransfer']: "Enter Authorised Bank"
        }))
      }

    }
    handleAuthorisedBank()

    // validation for resolving
    const handleResolving = () => {
      if (!LCInfo?.resolving) {
        setLCInfoError((prev) => ({
          ...prev, ['resolving']: "Please select resolving."
        }))
      }

    }
    handleResolving();

    // validation for currency32B
    const handleCurrency32B = () => {
      if (!LCInfo?.currency32B) {
        setLCInfoError((prev) => ({
          ...prev, ['currency32B']: "Please select currency 32B."
        }))
      }

    }
    handleCurrency32B();

    // validation for Amount32B
    const handleAmount32B = () => {
      if (!LCInfo?.amount) {
        setLCInfoError((prev) => ({
          ...prev, ['amount']: "Please select amount"
        }))
      }

    }
    handleAmount32B();

    // validation for maxMinTolerancePercentage
    const handleMaxMinToerancePercentage = () => {
      if (!LCInfo?.maxMinTolerancePercentage) {
        setLCInfoError((prev) => ({
          ...prev, ['maxMinTolerancePercentage']: "Please select max Min Tolerance Percentage"
        }))
      }

    }
    handleMaxMinToerancePercentage();

    // validation for Additional Amount
    const handleAdditionalAmount = () => {
      if (!LCInfo?.additionalAmount) {
        setLCInfoError((prev) => ({
          ...prev, ['additionalAmount']: "Please select additional Amount)"
        }))
      }

    }
    handleAdditionalAmount();

    // validation for Red Clause
    const handleRedClause = () => {
      if (!LCInfo?.redclause) {
        setLCInfoError((prev) => ({
          ...prev, ['redclause']: "Please select redclause"
        }))
      }

    }
    handleRedClause();

    // validation for Advanced Amount
    const handleAdvancedAmount = () => {
      if (!LCInfo?.advanceAmount) {
        setLCInfoError((prev) => ({
          ...prev, ['advanceAmount']: "Please select advanceAmount"
        }))
      }

    }
    handleAdvancedAmount();

    // validation for Currency Normal
    const handleCurrencyNormal = () => {
      if (!LCInfo?.normalCurrency) {
        setLCInfoError((prev) => ({
          ...prev, ['normalCurrency']: "Please select Currency"
        }))
      }

    }
    handleCurrencyNormal();

    // validation for Reinstatement Type
    const handleReinstatementType = () => {
      if (!LCInfo?.reinstatementType) {
        setLCInfoError((prev) => ({
          ...prev, ['reinstatementType']: "Please select reinstatement Type "
        }))
      }

    }
    handleReinstatementType();


    // validation for No of Revolvements
    const handleNoofRevolvements = () => {
      if (!LCInfo?.noofRevolvements) {
        setLCInfoError((prev) => ({
          ...prev, ['noofRevolvements']: "Please select no of Revolvements "
        }))
      }

    }
    handleNoofRevolvements();

    // validation for Max Drawing Amount
    const handleMaxDrawingAmount = () => {
      if (!LCInfo?.maxDrawingAmount) {
        setLCInfoError((prev) => ({
          ...prev, ['maxDrawingAmount']: "Please select max DrawingA mount "
        }))
      }

    }
    handleMaxDrawingAmount();


    // validation for Max Drawing Currency
    const handleMaxDrawingCurrency = () => {
      if (!LCInfo?.maxDrawingCurrency) {
        setLCInfoError((prev) => ({
          ...prev, ['maxDrawingCurrency']: "Please select max Drawing Currency) "
        }))
      }

    }
    handleMaxDrawingCurrency();
    //validation for Credit Available With 
    const handleCreditAvailableWith = () => {
      if (!LCInfo?.creditAvailableWith) {
        setLCInfoError((prev) => ({
          ...prev, ['creditAvailableWith']: "Please select Credit Available With."
        }))
      }
    }
    handleCreditAvailableWith()

    // validation for Credit Available By
    const handleCreditAvailableBy = () => {
      if (!LCInfo?.creditAvailableBy) {
        setLCInfoError((prev) => ({
          ...prev, ['creditAvailableBy']: "Please select Credit Available By."
        }))
      }
    }
    handleCreditAvailableBy()

    // validation for Additional Credit Available By
    const handleAdditionalDetailforCreditAvailableWith = () => {
      if (!LCInfo?.additionalDetailCreditAvailableWith && LCInfo?.creditAvailableWith === "OtherBank") {
        setLCInfoError((prev) => ({
          ...prev, ['additionalDetailCreditAvailableWith']: "Please select additional Detail CreditAvailable With."
        }))
      }
    }
    handleAdditionalDetailforCreditAvailableWith()

    // validation for Deferred Payment Details
    const handleDeferredPaymentDetails = () => {
      if (!LCInfo?.deferredPaymentDetails && LCInfo?.creditAvailableBy === "deferredPayment") {
        setLCInfoError((prev) => ({
          ...prev, ['deferredPaymentDetails']: "Please select deferred Payment Details."
        }))
      }
    }
    handleDeferredPaymentDetails()

    // validation for Tenor Period
    const handleTenorPeriod = () => {
      if ((!LCInfo?.tenorPeriodDays && LCInfo?.creditAvailableBy !== "deferredPayment") ||
        (!LCInfo?.tenorPeriodDays && LCInfo?.creditAvailableBy !== "mixedPayment")
      ) {
        setLCInfoError((prev) => ({
          ...prev, ['tenorPeriodDays']: "Please select tenor Period Days."
        }))
      }
      if(LCInfo?.tenorIndicator=== 'At Sight')
      {
        setLCInfoError((prev) => ({
          ...prev, ['tenorPeriodDays']: ""
        }))
      }
    }
    handleTenorPeriod()

    // validation for Tenor Indicator
    const handleTenorIndicator = () => {
      if ((!LCInfo?.tenorIndicator && LCInfo?.creditAvailableBy !== "deferredPayment") ||
        (!LCInfo?.tenorIndicator && LCInfo?.creditAvailableBy !== "mixedPayment")
      ) {
        setLCInfoError((prev) => ({
          ...prev, ['tenorIndicator']: "Please select tenor Indicator."
        }))
      }
    }
    handleTenorIndicator()

    const handleDrawee = () => {
      if ((LCInfo?.creditAvailableBy === 'acceptance' || LCInfo?.creditAvailableBy === 'negotiation' ||
        LCInfo?.creditAvailableBy === 'payment' || LCInfo?.creditAvailableBy === 'mixedPayment') && LCInfo?.drawee === '') {
        setLCInfoError((prev) => ({
          ...prev, ['drawee']: "Please select drawee."
        }))
      }
    }
    handleDrawee()

    // validation for Additional Credit Available  for Tennore Indicator
    const handleAdditionalDetailforTenorIndicator = () => {
      if (!LCInfo?.additionalDetailCreditAvailableWith2 && LCInfo?.tenorIndicator === "others") {
        setLCInfoError((prev) => ({
          ...prev, ['additionalDetailCreditAvailableWith2']: "Please select additional Detail CreditAvailable With."
        }))
      }
    }
    handleAdditionalDetailforTenorIndicator()

    // validation for Advicing Bank 
    const handleAdvicingBank = () => {
      if (!LCInfo?.advisingBank) {
        setLCInfoError((prev) => ({
          ...prev, ['advisingBank']: "Please select advicing bank."
        }))
      }
    }
    handleAdvicingBank()

    //  validation Advicing Bank  Address
    const handleAddressLine1 = () => {
      if (!LCInfo?.addressLine1) {
        setLCInfoError((prev) => ({
          ...prev, ['addressLine1']: "Please select address Line1 ."
        }))
      }
    }
    handleAddressLine1()


  }


  return (
    <div className="App">
      <h1>LC Information</h1>
      <form onSubmit={handleSubmit}>
        {/* ---------------------------LC Details Container----------------- */}
        <div className='LCDetailsContainer'>
          <h4>LC Details</h4>
          {/* radio Button(LC Type) */}
          <div className='div'>
            <lable>LCType (40A) *</lable>
            <input type="radio" value="irrevocable" name='LCtype'
              checked={LCInfo?.LCtype == "irrevocable"}
              onClick={(e) => {
                setLCInfo({ ...LCInfo, [e.target.name]: e.target.value })

              }}></input>
            <lable>irrevocable</lable>
            <input type="radio" value="irrevocable Transferable"
              checked={LCInfo?.LCtype === "irrevocable Transferable"}
              name='LCtype' onChange={(e) => { handleChange(e) }}></input>
            <lable>irrevocable Transferable</lable>
            <div className='error'>
              <lable>{LCInfoError?.LCtype && LCInfoError?.LCtype}</lable>
            </div>
          </div>
          {/* Effective Date */}
          <div className='div'>
            <lable>Effective Date *</lable>
            <input type="text" value={LCInfo?.effectiveDate} />
            <div className='error'>
              <lable>{LCInfoError?.effectiveDate && LCInfoError?.effectiveDate}</lable>
            </div>
          </div>
          {/* LC Category */}
          <div className='div'>
            <lable>LC Category * </lable>
            <select name='lcCategory' onChange={(e) => {
              handleChange(e)
            }} >
              <option value="" name='lcCategory'></option>
              <option value='Domestic' name='lcCategory'>Domestic</option>
              <option value='Foreign' name='lcCategory'>Foreign</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.lcCategory && LCInfoError?.lcCategory}</lable>
            </div>
          </div>
          {/* Purpose */}
          <div className='div'>
            <lable>Purpose * </lable>
            <select name='purpose' onChange={(e) => { handleChange(e) }}>
              <option value=""></option>
              <option value="Other">Other</option>
              <option value="Service">Service</option>
              <option value="CAPAX"> CAPEX</option>
              <option value="Peroleum">PETROLEUM</option>
              <option value="Raw Materials">RAW MATERIALS</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.purpose && LCInfoError?.purpose}</lable>
            </div>
          </div>
          {/* Delivary via*/}
          <div className='div'>
            <lable>Delivary via *</lable>
            <select name='delivaryVai'
              value={LCInfo.delivaryVai}
              onChange={(e) => { handleChange(e) }}
            >

              {LCInfo.lcCategory === "" && <option value=""></option>}
              <option value="swift">swift</option>
              <option value="SFMS" disabled={LCInfo.lcCategory === "Foreign"}>SFMS</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.delivaryVai && LCInfoError?.delivaryVai}</lable>
            </div>
          </div>
          {/* Expiry Date*/}
          <div className='div'>
            <lable>Expiry Date *</lable>
            <input type='date' name='expiryDate'
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => { handleChange(e) }}></input>
            <div className='error'>
              <lable>{LCInfoError?.expiryDate && LCInfoError?.expiryDate}</lable>
            </div>
          </div>

          {/* Place of Expiry*/}
          <div className='div'>
            <lable>Place of Expiry *</lable>
            <input type='text' name='placeOfExpiry'
              value={LCInfo?.placeOfExpiry}
              onChange={(e) => { handleChange(e) }}
            ></input>
            <div className='error'>
              <lable>{LCInfoError?.placeOfExpiry && LCInfoError?.placeOfExpiry}</lable>
            </div>
          </div>


          {/* Authorised Bank For transfer  */}
          {LCInfo?.LCtype === "irrevocable Transferable" && (
            <div className='div'>
              <lable>Authorised Bank For transfer *</lable>
              <input type='text' name='authorisedBankForTransfer'
                onChange={(e) => { handleChange(e) }}></input>
              <div className='error'>
                <lable>{LCInfoError?.authorisedBankForTransfer && LCInfoError?.authorisedBankForTransfer}</lable>
              </div>
            </div>
          )
          }
        </div>

        {/*--------- Amount Details Container--------------------------------------------------------*/}
        <div className='AmountDetailsContainer'>
          <h4>Amount Details</h4>
          {/* radio Button(Resolving) */}
          <div className='div'>
            <lable>Revolving *</lable>
            <input type="radio" value='YES' name='resolving' onChange={(e) => { handleChange(e) }} checked={LCInfo?.resolving == 'YES'}></input>
            <lable>YES</lable>
            <input type="radio" value='NO' name='resolving' checked={LCInfo?.resolving === 'NO'} onChange={(e) => { handleChange(e) }} ></input>
            <lable>No</lable>
            <div className='error'>
              <lable>{LCInfoError?.resolving && LCInfoError?.resolving}</lable>
            </div>
          </div>
          {/* Currency (32B) */}
          <div className='div'>
            <lable>Currency (32B) * </lable>
            <select name='currency32B' onChange={(e) => { handleChange(e) }}>
              <option value=""> </option>
              <option value='INR'>INR</option>
              <option value='Doller'>Doller</option>
              <option value='Rubbel'>Rubbel</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.currency32B && LCInfoError?.currency32B}</lable>
            </div>
          </div>

          {/* Amount(32B) */}
          <div className='div'>
            <lable>Amount(32B) *</lable>
            <input type="text" name='amount' maxLength={10} onChange={(e) => { validateForNumber(e) }} />
            <div className='error'>
              <lable>{LCInfoError?.amount && LCInfoError?.amount}</lable>
            </div>
          </div>

          {/* Max-Min Tolerance Percentage(39A) */}
          <div className='div'>
            <lable> Max-Min Tolerance Percentage(39A)</lable>
            <input type="text" name='maxMinTolerancePercentage' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              <lable>{LCInfoError?.maxMinTolerancePercentage && LCInfoError?.maxMinTolerancePercentage}</lable>
            </div>
          </div>

          {/*Additional Amount(39C) */}
          <div className='div'>
            <lable> Additional Amount(39C)</lable>
            <input type="text" name='additionalAmount' maxLength={144} onChange={(e) => {
              validateAdditionalAmount(e);
            }} />
            <div className='error'>
              <lable>{LCInfoError?.additionalAmount && LCInfoError?.additionalAmount}</lable>
            </div>
          </div>

          {/* Red clause */}
          <div className='div'>
            <lable>Red clause</lable>
            <select name='redclause' onChange={(e) => { handleChange(e) }} >
              <option value="NO"> NO</option>
              <option value="YES">Yes</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.redclause && LCInfoError?.redclause}</lable>
            </div>
          </div>

          {LCInfo?.redclause === 'YES' && (<>
            {/*Advance Amount */}
            <div className='div'>
              <lable> Advance Amount </lable>
              <input type="text" name='advanceAmount' onChange={(e) => { validateForNumber(e) }} />
              <div className='error'>
                <lable>{LCInfoError?.advanceAmount && LCInfoError?.advanceAmount}</lable>
              </div>
            </div>
          </>)}


          {/* Currency */}
          <div className='div'>
            <lable>Currency</lable>
            <select name='normalCurrency'
              value={LCInfo?.normalCurrency}
              onChange={(e) => { handleChange(e) }} >
              <option value=""> </option>
              <option value='INR'>INR</option>
              <option value='Doller'>Doller</option>
              <option value='Rubbel'>Rubbel</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.normalCurrency && LCInfoError?.normalCurrency}</lable>
            </div>
          </div>
          {LCInfo?.resolving === 'YES' && (
            <>
              {/* Reinstatement Type */}
              <div className='div'>
                <lable>Reinstatement Type *</lable>
                <select name='reinstatementType' onChange={(e) => { handleChange(e) }} >
                  <option value='Manual'>Manual</option>
                  <option value='Auto'>Auto</option>
                </select>
                <div className='error'>
                  <lable>{LCInfoError?.reinstatementType && LCInfoError?.reinstatementType}</lable>
                </div>
              </div>

              {/*No of Revolvements*/}
              <div className='div'>
                <lable> No of Revolvements *</lable>
                <input type="number" name='noofRevolvements' onChange={(e) => { handleChange(e) }} />
                <div className='error'>
                  <lable>{LCInfoError?.noofRevolvements && LCInfoError?.noofRevolvements}</lable>
                </div>
              </div>

              {/*Max Drawing Amount*/}
              <div className='div'>
                <lable> Max Drawing Amount </lable>
                <input type="text" name='maxDrawingAmount' onChange={(e) => { validateForNumber(e) }} />
                <div className='error'>
                  <lable>{LCInfoError?.maxDrawingAmount && LCInfoError?.maxDrawingAmount}</lable>
                </div>
              </div>
              {/* Max Drawing Currency */}
              <div className='div'>
                <lable>Max Drawing Currency</lable>
                <select name='maxDrawingCurrency'
                  value={LCInfo?.maxDrawingCurrency}
                  onChange={(e) => { handleChange(e) }}>
                  <option value=""> </option>
                  <option value='INR'>INR</option>
                  <option value='Doller'>Doller</option>
                  <option value='Rubbel'>Rubbel</option>
                </select>
                <div className='error'>
                  <lable>{LCInfoError?.maxDrawingCurrency && LCInfoError?.maxDrawingCurrency}</lable>
                </div>
              </div>
            </>

          )}

        </div>


        {/*--------- Credit Availability Details Container--------------------------------------------------------*/}
        <div className='creditAvailabilityDetailsContainer'>
          <h4>Credit Availability Details</h4>
          {/* Credit Available With (41A)  */}
          <div className='div'>
            <lable>Credit Available With (41A)* </lable>
            <select name='creditAvailableWith' onChange={(e) => { handleChange(e) }} value={LCInfo?.creditAvailableWith}>
              <option value=""></option>
              <option value="AdvisingBank">Advising Bank</option>
              <option value='AnyBank'>Any Bank</option>
              <option value='AxisBank'>Axis Bank</option>
              <option value='OtherBank'>Other Bank</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.creditAvailableWith && LCInfoError?.creditAvailableWith}</lable>
            </div>
          </div>

          {/* Additional detail for Credit Available With (41A) */}
          {LCInfo?.creditAvailableWith === 'OtherBank' && (
            <>
              <div className='div'>
                <lable>Additional detail for Credit Available With (41A)*</lable>
                <input type="text" name='additionalDetailCreditAvailableWith' onChange={(e) => { handleChange(e) }} />
                <div className='error'>
                  {LCInfoError?.additionalDetailCreditAvailableWith && LCInfoError?.additionalDetailCreditAvailableWith}
                </div>
              </div>
            </>
          )}


          {/* Credit Available By (41A)  */}
          <div className='div'>
            <lable>Credit Available By (41A) * </lable>
            <select name='creditAvailableBy' onChange={(e) => { handleChange(e) }}>
              <option value="acceptance">Acceptance</option>
              <option value='deferredPayment'>Deferred Payment</option>
              <option value='mixedPayment'>Mixed Payment</option>
              <option value='negotiation'>Negotiation</option>
              <option value='payment'>Payment</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.creditAvailableBy && LCInfoError?.creditAvailableBy} </lable>
            </div>
          </div>

          {/* Deferred Payment Details (42P) */}
          {LCInfo?.creditAvailableBy === 'deferredPayment' && (<>

            <div className='div'>
              <lable>Deferred Payment Details (42P)</lable>
              <input type="text" name='deferredPaymentDetails' onChange={(e) => { handleChange(e) }} />
              <div className='error'>
                <lable>{LCInfoError?.deferredPaymentDetails && LCInfoError?.deferredPaymentDetails}</lable>
              </div>
            </div>
          </>)}

          {/* Tenor Period Days (42C) */}
          {(LCInfo?.creditAvailableBy !== 'deferredPayment' && LCInfo?.creditAvailableBy !== 'mixedPayment') && (<>

            <div className='div'>
              <lable>Tenor Period Days (42C)</lable>
              <input type="text" name='tenorPeriodDays'
                maxLength={3}
                onChange={(e) => { validateTenorPeriodDays(e) }}
                value={LCInfo?.tenorPeriodDays}
                disabled={LCInfo?.tenorIndicator === 'At Sight'}
              />
              <div className='error'>
                <lable>{LCInfoError?.tenorPeriodDays && LCInfoError?.tenorPeriodDays}</lable>
              </div>
            </div>
            {/* Tenor Indicator (42C) */}
            <div className='div'>
              <lable>Tenor Indicator (42C) </lable>
              <select name='tenorIndicator' onChange={(e) => { handleChange(e) }} >
                <option value="afterBillOfLadingDate">After Bill of Lading Date</option>
                <option value='At Sight'>At Sight</option>
                <option value='billofLadingDate'>Bill of Lading Date</option>
                <option value='fromAirwayBillDate'>From Airway Bill Date</option>
                <option value='fromBillOfLadingDate'>From Bill of Lading Date</option>
                <option value='fromInvoiceDate'>From Invoice Date</option>
                <option value='fromNegotiationDate'>From Negotiation Date</option>
                <option value='fromShipmentDate'>From Shipment Date</option>
                <option value='others'>Others</option>
              </select>
              <div className='error'>
                <lable>{LCInfoError?.tenorIndicator && LCInfoError?.tenorIndicator}</lable>
              </div>
            </div>
          </>)}

          {/* Drawee (42A)  */}
          {displayDrawee &&
            (<>

              <div className='div'>
                <lable>Drawee (42A)</lable>
                <select name='drawee' onChange={(e) => handleChange(e)} >
                  <option value=""></option>
                  <option value="issuingBank">Issuing Bank</option>
                  <option value='confirmingBank'>Confirming Bank</option>
                </select>
                <div className='error'>
                  <lable>{LCInfoError?.drawee && LCInfoError?.drawee}</lable>
                </div>
              </div>
            </>)
          }
          {/* Confirmation of Credit 49 */}
          <div className='div'>
            {(LCInfo?.drawee === "confirmingBank" && displayDrawee) && (<>
              <lable>Confirmation of Credit 49 </lable>
              <select name='confirmationOfCredit49'
                onChange={(e) => { handleChange(e) }}
                value={LCInfo?.confirmationOfCredit49}
              >
                <option value="yes">Yes</option>
              </select>
            </>)}

            {(LCInfo?.drawee === "issuingBank" && displayDrawee) && (<>
              <lable>Confirmation of Credit 49 </lable>
              <select name='confirmationOfCredit49'
                value={LCInfo?.confirmationOfCredit49}
                onChange={(e) => { handleChange(e) }} >
                <option value='mayAdd' >May Add</option>
                <option value='no'>No</option>
              </select>
            </>)}
            <div className='error'>
              <lable>{ }</lable>
            </div>
          </div>
          {/* Additional detail for Credit Available With (42c) */}
          {LCInfo?.tenorIndicator === "others" && (
            <>
              <div className='div'>
                <lable>Additional detail for Credit Available With (42c)*</lable>
                <input type="text" name='additionalDetailCreditAvailableWith2' onChange={(e) => { handleChange(e) }} />
                <div className='error'>
                  {LCInfoError?.additionalDetailCreditAvailableWith2 && LCInfoError?.additionalDetailCreditAvailableWith2}
                </div>
              </div>
            </>
          )}
        </div>


        {/*--------- Advising Bank Container--------------------------------------------------------*/}
        <div className='advisingBankContainer'>
          <h4>Advising Bank*</h4>
          <div>
            <select name='advisingBank' onChange={(e) => { handleChange(e) }} value={LCInfo?.advisingBank}>
              <option value=""></option>
              <option value="SpecificBank">Specific Bank</option>
              <option value='AnyBank'>Any Bank</option>
            </select>
            <div className='error'>
              <lable>{LCInfoError?.advisingBank && LCInfoError?.advisingBank}</lable>
            </div>
          </div>

          {/* Branch */}
          <div className='div'>
            <lable>Branch</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>


          {/*Address Line-1 (Mandatory) */}
          <div className='div'>
            <lable>Address Line-1*</lable>
            <input type="text" name='addressLine1' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              {LCInfoError?.addressLine1 && LCInfoError?.addressLine1}
            </div>
          </div>

          {/*Address Line-2 */}
          <div className='div'>
            <lable>Address Line-2</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>

          {/* Country */}
          <div className='div'>
            <lable> Country</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>

          {/* State */}
          <div className='div'>
            <lable> State</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>

          {/*  City */}
          <div className='div'>
            <lable>  City</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>

          {/*  PIN Code */}
          <div className='div'>
            <lable>  PIN Code</lable>
            <input type="text" name='' onChange={(e) => { handleChange(e) }} />
            <div className='error'>
              { }
            </div>
          </div>
        </div>


        {/*--------- Confirming Bank Details Container--------------------------------------------------------*/}
        <div className='confirmingBankDetailsContainer'>
          <h4>Confirming Bank Details  *</h4>
            {/* Confirmation Charges Borne By */}
            <div className='div'>
              <lable>Confirmation Charges Borne By </lable>
              <select name=''
                onChange={(e) => { handleChange(e) }}
              // value={}
              >
                <option value="applicant">Applicant</option>
                <option value="Beneficiary">Beneficiary</option>
              </select>
              <div className='error'>
              { }
            </div>
            </div>
           {/* Confirmation of Credit (49) */}
           <div>
           <lable>Confirmation of Credit (49) </lable>
            <select>
              <option>NO</option>
              <option>YES</option>
              <option>May Add</option>
            </select>
           </div>
        
        </div>

        {/*---------Advised through Bank Details  Container--------------------------------------------------------*/}
        <div className='AdvisedTthroughBankDetailsContainer'>
          <h4>Advised through Bank Details *</h4>
        </div>

        {/* submit button */}
        <div className='button'><input type='submit'></input></div>
      </form>
    </div>
  );
}

export default App;
