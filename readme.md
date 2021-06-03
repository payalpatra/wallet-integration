## Creating A Wallet

### http://localhost:3000/ewallet

### Example Body Data

```sh
{
 "first_name": "rashmita",
 "last_name": "Patra",
 "ewallet_reference_id": "rashmita-Patra-05252021",
 "type": "person",
 "phone_number": "+918984557378",
 "email": "rashmitapatra105@gmail.com"
}
```

## Money Transfer Between Wallet

### http://localhost:3000/transfer

### Example Body Data

```sh
{
 "source_ewallet": "ewallet_a92e82e3ab701557893001f4c56900ee",
 "amount": "100",
 "currency": "EUR",
 "destination_ewallet": "ewallet_f4430ea8873785b33479615eecf137d0",
}
```

## Money Transfer Confirmation

### http://localhost:3000/confirmation

### Example Body Data

```sh
{
 "id": "3565bd85-c384-11eb-b38b-02240218ee6d", // This can be used only one time
 "status": "accept"
}
```

## Get the Checkout Page Url

### http://localhost:3000/checkout

### Example Body Data

```sh
{
    "amount": 100,
    "country": "US",
    "currency": "USD"
}
```

### Example URL with Unique Token

```sh
https://sandboxcheckout.rapyd.net?token=checkout_ed691aefafc97716078d6da8306d2aa8

```

## List of transactions for a particular wallet

### http://localhost:3000/listTransactions

### Example Response Data

```sh
[
 {
   id: 'wt_aad0ce434965b39337895001c6535a55',
   amount: -500,
   currency: 'USD',
   ewallet_id: 'ewallet_8a695b403979fb788f59acf134b7e30b',
   type: 'p2p_transfer',
   balance_type: 'available_balance',
   created_at: 1622621409,
   status: 'CLOSED',
   reason: ''
 },
 {
   id: 'wt_3062b75d744c3092b27e1590b002d32b',
   amount: 500,
   currency: 'USD',
   ewallet_id: 'ewallet_8a695b403979fb788f59acf134b7e30b',
   type: 'p2p_transfer',
   balance_type: 'available_balance',
   created_at: 1622619798,
   status: 'CLOSED',
   reason: ''
 }
]
```
