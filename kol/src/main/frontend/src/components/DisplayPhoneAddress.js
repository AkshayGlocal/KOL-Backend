import '../css/DisplayPhoneAndLocation.css';
import { useState, useEffect } from 'react';
import phone from '../images/phone.png';
import fax from '../images/fax.png';
import email from '../images/email.png';
import location from '../images/location.png';
import mailbox from '../images/mailbox.png';
export default function DisplayPhoneAddress(props) {
	let data = props.Results;
	let results = [];
	const [ DisplayPhoneAddress, setDisplayPhoneAddress ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.phone = e.phone.raw;
				tempobj.fax = e.fax.raw;
				tempobj.extra_phone_numbers = e.extra_phone_numbers.raw;
				tempobj.primary_email =e.primary_email.raw;
				tempobj.extra_email_addresses = e.extra_email_addresses.raw;
				// 	phone: { raw: {} },
				// fax:{raw:{}},
				// extra_phone_numbers:{raw:{}},
				// primary_email:{raw:{}},
				// extra_email_addresses:{raw:{}},
				
				tempobj.address1 = e.address1.raw;
				tempobj.address2 = e.address2.raw;
				tempobj.city = e.city.raw;
				tempobj.state = e.state.raw;
				tempobj.country = e.country.raw;
				tempobj.postal_code = e.postal_code.raw;
				tempobj.region = e.region.raw;
				// address1: { raw: {} },
				// address2: { raw: {} },
			// city:{raw:{}},
			// state:{raw:{}},
			// country: { raw: {} },
			// postal_code:{raw:{}},
			// region:{raw:{}},
			
				results.push(tempobj);
			});
			setDisplayPhoneAddress(results);
		},
		[ data ]
	);
	return (
		<div>
			{DisplayPhoneAddress.map((e, index) => (
				<div className="phone-location-container">
					<p><img src={phone} />{e.phone}</p>
					
					{e.fax && (
						<p><img src={fax} />{e.fax}</p>
					)}
					{e.extra_phone_numbers && e.extra_phone_numbers.length>1 && (
					<p><img src={phone} />{e.extra_phone_numbers}</p>
					) 
					}
					<p><img src={email} />{e.primary_email}</p>
					<p>
					{e.extra_email_addresses}
					</p>
					<p><img src={location}/>{e.address1}  {e.city}, {e.state}, {e.country}</p>
					{/* {e.address2} </p> */}
					<p><img src={mailbox}/>{e.postal_code}</p>
				</div>
			))}
		</div>
	);
}
