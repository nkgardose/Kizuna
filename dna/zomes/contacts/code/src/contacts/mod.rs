use hdk::{
    prelude::*,
    AGENT_ADDRESS,
};

pub mod handlers;
pub mod strings;
use strings::*;
use holochain_entry_utils::HolochainEntry;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Contacts {
    agent_id: Address,
    timestamp: usize,
    contacts: Vec<Address>,
    blocked: Vec<Address>,
}

impl HolochainEntry for Contacts {
    fn entry_type() -> String {
        String::from(CONTACTS_ENTRY_NAME)
    }
}

impl Contacts {
    fn new(timestamp: usize) -> Self {
        Contacts {
            agent_id: AGENT_ADDRESS,
            timestamp: usize,
            contacts: Vec::new(),
            blocked: Vec::new(),
        }
    } 
}

pub fn contacts_definition() -> ValidatingEntryType {
    entry!(
        name: Contacts::entry_type(),
        description: "this is the contacts of the agent",
        sharing: Sharing::Private,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Contacts>| {
            Ok(())
        },
        // Is there any attack vector from linking private entries considering that links are a public entry?
        from!(
            "%agent_id",
            link_type: AGENT_CONTACTS_LINK_TYPE,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
            validation: | _validation_data: hdk::LinkValidationData | {
                Ok(())
            }
        )  
    )
}