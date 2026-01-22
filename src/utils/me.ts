export const name = "Meetkumar Saspara";
export const homepage_url = "https://meet114.github.io/portfolio-site/";
export const linkedin_username = "meetkumar-saspara";
export const github_username = "meet114";

/*=============================================================================\
 | The email, phone number, and address fields below are Base64 encoded to     |
 | obfuscate them in the source code.  To update them, encode the data in      |
 | Base64 and paste the output as a string argument to the corresponding       |
 | `atob()` function below.                                                    |
 \============================================================================*/
const email_base64_encoded = "bWVldHNhc3BhcmE5QGdtYWlsLmNvbQ==";
const phone_base64_encoded = "KzEoOTM0KTQ1MS05Mjkx";

// The address fields below are for the privacy policy. They are also Base64 encoded.
const address_line_1_base64_encoded = "QXJsaW5ndG9uLCBUWA=="; // "Arlington, TX"
const address_line_2_base64_encoded = "NzYwMTM="; // "76013"

// The data is decoded and exported below. Do not edit below this line.
export const email = atob(email_base64_encoded);
export const phone = atob(phone_base64_encoded);
export const address_line_1 = atob(address_line_1_base64_encoded);
export const address_line_2 = atob(address_line_2_base64_encoded);

// Helper code for creating URLs from the above data.
export const linkedin_short = `linkedin.com/in/${linkedin_username}`;
export const linkedin_url   = `https://www.linkedin.com/in/${linkedin_username}`;
export const github_url = `https://github.com/${github_username}`;
