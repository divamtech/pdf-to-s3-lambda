# pdf-to-s3-lambda

create three layers:

```sh
npm i aws-sdk@2.1520.0
npm i @sparticuz/chromium@123.0.0 #find chromium-v123.0.0-layer.zip and download layer directly from link https://github.com/Sparticuz/chromium/releases/tag/v123.0.0
npm i puppeteer-core@22.6.4
```

create a folder called `nodejs` and paste `package.json`, `package-lock.json` and `node_modules` inside this folder. archive this as `aws-sdk.zip`/`puppeteer-core-22.6.4.zip`.
upload this archives to `s3` and create layers at lambda.

archive(.zip) the rest of code at `src` folder and upload to lambda function. read the `pdf-to-s3.yaml` for exact lambda config.

```yml
Handler: index.handler
Runtime: nodejs20.x
MemorySize: 1024mb
```

<img src="./imgs/config2.png" width="400" />
<img src="./imgs/config.png" width="400" />

I attached lambda to load balancer, you can attach API gateway.

Now ready to do

```sh
curl --location 'https://<lambda.your-domain.com/pdf-to-s3>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "s3FilePublic": true,
    "s3Region": "<your_s3_region>",
    "s3Bucket": "<your_s3_bucket_name>",
    "s3KeyId": "<your_s3_key_id>",
    "s3SecretKey": "<your_s3_secret_key>",
    "s3Path": "<you_s3_bucket_path>.pdf",
    "htmlContent": "<!DOCTYPE html><html>  <head>    <title></title>    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css\"      crossorigin=\"anonymous\">    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js\"      integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\"      crossorigin=\"anonymous\"></script>  </head>  <body style=\"margin: 0 !important; padding: 0 !important;\">    <div id=\"invoicePrint\" class=\"position-relative d-flex justify-content-between flex-column mx-5\"      style=\"width: 700px;\">      <div style=\"min-height: 800px;\">        <div class=\"d-flex justify-content-between align-items-center pb-3\" style=\"border-bottom: 2px solid black;\">          <div style=\"height:70px; width: 100px;\">            <img style=\"object-fit: contain;\" src=\"https://s3.ap-south-1.amazonaws.com/webledger-assets-office-dev/Businesses/1/images/1702237498.png\" height=\"70\" width=\"100\">          </div>          <div class=\"fs-1\">            <div style=\"font-size: 29px;font-weight:800;margin-left: 120px;\">Invoice</div>          </div>          <div style=\"width: 30%;\">            <div class=\"d-flex justify-content-between mt-1\">              <span class=\"col-md-7\"><b>Invoice No:</b></span> <span class=\"text-end\">                INV/23-24/NOV/1              </span>            </div>            <div class=\"d-flex justify-content-between mt-1\">              <span class=\"col-md-7\"><b> Invoice Date:</b></span>              <span>29-11-2023</span>            </div>            <div class=\"d-flex justify-content-between mt-1\">              <span><b>Due Date:</b></span>              <span>12-12-2023</span>            </div>          </div>        </div>        <div class=\" d-flex justify-content-between mt-1\">          <div class=\"col-md-5\">            <div class=\"mb-1 col-md-12\" style=\"border-bottom: 1px solid black;\">              <h5 class=\"fw-bold fs-4\">Issued by</h5>            </div>            <div class=\"d-flex\">              <div class=\"fw-bold\" style=\"width: 100px;\">Billed From:</div>              <span class=\"fs-6\">DIVAM TECHNOLOGIES (OPC) PRIVATE LIMITED</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Address:</div>              <span style=\"width: 60%;\">                <span class=\"col-6 col-sm-4 fs-6\">                  88 A, Shiv Nagar, Murlipura, Jaipur, Rajasthan - 302039                </span>              </span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Email Id :</div>              <span class=\"fs-6\">contact@divamtech.com</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">GSTIN :</div> <span class=\"fs-6\">08AAICD4100H1Z0</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">PAN :</div><span class=\"fs-6\">AAICD4100H</span>            </div>          </div>          <div class=\"col-md-5 mb-1\">            <div class=\"\" style=\"border-bottom: 1px solid black;\">              <h5 class=\"fw-bold fs-4\">Billed to</h5>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Billed To :</div> <span class=\"fs-6\" style=\"width: 60%;\">Gatik Technologies (Opc) Private Limited</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Address:</div><span class=\"col-md-8 fs-6\">                306, Third Floor, Arg Group North Avenue, Jaipur, Rajasthan - 302013            </span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Phone:</div><span class=\"fs-6\">+91                8278613749</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">Email Id :</div>              <span class=\"fs-6\">contact@gatiktech.com</span>            </div>            <div class=\"d-flex mt-1\">              <div class=\"fw-bold\" style=\"width: 30%;\">PAN :</div><span class=\"fs-6\">AAJCG0355Q</span>            </div>          </div>        </div>        <div id=\"tableData\" class=\"mt-6\">          <table class=\"mt-2 border-end border-start col-md-12\">            <thead class=\"fw-lighter\" style=\"color: white; background-color: grey;\">              <tr>                <th class=\"fw-semibold col-md-1 pt-1 bp-1 text-center\">Sr. No.</th>                <th class=\"fw-semibold\">Service Name</th>                <th class=\"fw-semibold\">Description</th>                <th class=\"fw-semibold col-md-1 text-center\">GST</th>                <th class=\"fw-semibold col-md-2 text-end pe-2\">Amount (Rs.)</th>              </tr>            </thead>            <tbody>              <tr class=\"vendorListData h-25 border-bottom\">                <th class=\"ps-2 text-center pt-2 pb-2 fs-6\" scope=\"row\">                  1                </th>                <td class=\"fs-6 ps-2\">                  Software Development Consultancy                </td>                <td class=\"fs-6 ps-2 \">                  Nov 2023                </td>                <td class=\"fs-6 ps-2 text-center\">                  18 %                </td>                <td class=\"fs-6 pe-2 text-end\">                  75000.00                </td>              </tr>              <tr class=\"h-25px\" style=\"background-color: #FAFAFA\">                <td></td>                <td class=\"ps-2\"><strong>Total</strong></td>                <td></td>                <td></td>                <td class=\"text-end\"><strong>Rs. 75000</strong></td>              </tr>            </tbody>          </table>        </div>        <div id=\"qrDiv\" class=\"mt-5 d-flex justify-content-between\">          <div class=\"col-md-6 d-flex justify-content-between\">            <div class=\"h-60px\">              <div class=\"\">                <img src=\"data:image/png;base64,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\" alt=\"QR Code\" height=\"150\" width=\"150\" class=\"qr-code-img qrimg\">              </div>              <div class=\"text-center\">UPI-Scan to Pay</div>            </div>            <div class=\"col-md-9 mt-1\">              <div class=\"mt-1 fs-7\"><span>Name :</span><span class=\"ms-2\">Divam Technologies Opc Private Limited</span>              </div>              <div class=\"mt-1 fs-7\">                <span>Bank Name :</span> <span class=\"ms-2\">Hdfc Bank, </span>              </div>              <div class=\"mt-1 fs-7\"><span>Bank Account No:</span><span class=\"ms-2\">50200057701940</span></div>              <div class=\"mt-1 fs-7\"><span>IFSC Code :</span><span class=\"ms-2\">HDFC0000348</span></div>              <div class=\"mt-1 fs-7\"><span>UPI Id :</span><span class=\"ms-2\">divamtechno@okhdfc</span></div>            </div>          </div>          <div class=\"col-md-4 p-3 rounded-3\" style=\"background-color: #FAFAFA\">            <div class=\"mt-1 d-flex fs-6\">              <div class=\"col-md-6 text-end\">Sub-Total :</div>              <div class=\"col-md-6 text-end\">Rs. 75000</div>            </div>            <div class=\"mt-1 d-flex fs-6\">              <div class=\"col-md-6 text-end\">Discount :</div>              <div class=\"col-md-6 text-end\">Rs. 0</div>            </div>            <div class=\"mt-1 d-flex fs-6\">              <div class=\"col-md-6 text-end\">SGST :</div>              <div class=\"col-md-6 text-end\">Rs. 6750</div>            </div>            <div class=\"mt-1 d-flex fs-6\">              <div class=\"col-md-6 text-end\">CGST :</div>              <div class=\"col-md-6 text-end\">Rs. 6750</div>            </div>            <hr>            <div class=\"mt-1 d-flex align-items-center fs-6\">              <div class=\"col-md-6 text-end fw-bolder fs-6\">Grand Total :</div>              <div class=\"col-md-6 text-end fw-bold fs-6\">Rs. 88500</div>            </div>          </div>        </div>      </div>      <hr class=\"mb-2 mt-5\">      <div class=\"d-flex justify-content-between align-items-center\">        <div class=\"col-md-8 p-0\">        </div>        <div class=\"me-6 text-end align-self-end\">          <div class=\"mb-5 fw-bold\">DIVAM TECHNOLOGIES (OPC) PRIVATE LIMITED</div>          <div class=\"\">Authorized Signature</div>        </div>      </div>      <div class=\"fw-8 d-flex justify-content-center align-items-center mt-4\">Powered by&nbsp;        <strong>Web</strong>Ledger      </div>    </div>    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js\"      integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\"      crossorigin=\"anonymous\"></script>  </body></html>"
}'
```

If you are facing issue to pass `htmlContent` try to first convert and then pass as `htmlContent.replace(/\n/g, '').replace(/"/g, '\\"').replace(/</g, '\\u003c').replace(/>/g, '\\u003e')`
