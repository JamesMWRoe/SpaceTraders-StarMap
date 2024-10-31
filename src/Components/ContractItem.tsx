import { Contract } from "../Types/Contract"
import "../Styles/ContractItem.css"

type ContractItemProps =
{
  contract: Contract
}

export default function ContractItem({contract: contract}: ContractItemProps)
{
  return(
  <li className="contractListItem">
    <div className="contractHeadSection">
      <p className="contractType">Contract Type: {contract.type}</p>
      <ul className="contractActions">
        <li className="acceptContract"><button>A</button></li>
      </ul>
    </div>
    <div className="contractMainSection">
      <div className="contractTermsSection">
        <h3 className="contractHeader">Terms:</h3>
        {contract.terms.deliver.map(item => <p className="delivery">deliver {item.unitsRequired} {item.tradeSymbol} to {item.destinationSymbol}</p> )}
        <p className="contractTerms">You have until {new Date(contract.terms.deadline).toUTCString()}.</p>
      </div>
      <div className="contractsPaymentSection">
        <h3 className="paymentHeader">Payment:</h3>
        <span className="onAccept">Upon Acceptance: {contract.terms.payment.onAccepted}</span>
        <span className="onFulfill">Upon Fullfillment: {contract.terms.payment.onFulfilled}</span>
      </div>
    </div>
  </li>
  )
}