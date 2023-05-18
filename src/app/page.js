"use client";

/* 
features implemented
=========================
1. remove space between PS- and number
2. <Font><sup>nbsp</sub></Font> ===> <sup>nbsp</sub>
3. header
4. footer
5. auto page increment
6. AMD text
7. Font page red text
8. cover photo
9. p tag with nbsp before and after page break
10. copy the code based on 99/100

*/

import Image from "next/image";
import React, { useState } from "react";
import NinetyNinePercent from "./Components/NinetyNinePercent";
import HundredPercentFile from "./Components/HundredPercentFile";

const App = () => {
  const [html, setHtml] = useState("");
  const [redText, setRedText] = useState("");
  const [blackText, setBlackText] = useState("");

  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");

  //for copy clipboard
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      // Remove spaces between "PS-" and numbers
      let modifiedHtml = reader.result.replace(/PS-\s*(\d+)/g, "PS-$1");

      // Get the selected radio button value
      const radioButtons = document.getElementsByName("percentage");
      let percentage = "";
      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
          percentage = radioButtons[i].value;
          break;
        }
      }

      //header
      let removeAndFromHeader = header && header.replace(/&/g, "&amp;");
      let finalHeader = removeAndFromHeader.replace(/®/g, "<sup>&reg;</sup>");

      //footer
      let finalFooter =
        footer && footer.split("  |  ")[0] + "&nbsp;&nbsp;|&nbsp;&nbsp;PS-";

      //for the last index
      let checkTotalTimes = /<!-- Field: Page; Sequence:/g;
      let lastIndex = modifiedHtml.match(checkTotalTimes).length + 1;

      // Add code depending on the selected percentage
      if (percentage === "99%") {
        if (redText.length > 0 && blackText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 12.25pt; color: black">${blackText}</P>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 12.25pt; color: red">${redText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 12.25pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else if (redText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 12.25pt; color: red">${redText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 12.25pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else if (blackText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 12.25pt; color: black">${blackText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 12.25pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 12.25pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        }

        //header and footer
        //if digit === 1 then only hr + header
        //if digit !== 1 then footer + hr + header
        modifiedHtml = modifiedHtml.replace(
          /<!-- Field: Page; Sequence: (\d+) -->(.*?)<!-- Field: \/Page -->/gs,
          (_, digit) =>
            parseInt(digit) === 1
              ? `<!-- Field: Page; Sequence: ${parseInt(
                  digit
                )} -->\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n
            <DIV STYLE="page-break-before: always;margin-left:12.25pt; margin-top: 6pt; margin-bottom: 6pt">\n<P STYLE="font: 8pt Arial, Helvetica, Sans-Serif;
            border-bottom: Black 1pt solid; margin-bottom: 0; color: rgb(147,149,152); margin-top: 9pt">${finalHeader}</P>\n</DIV>\n\n<!-- Field: \/Page -->`
              : `<!-- Field: Page; Sequence: ${parseInt(
                  digit
                )} -->\n\n <div style="text-align:left;padding-left:15px; margin-top:15px;"></div>
              <TABLE CELLSPACING="0" CELLPADDING="0" STYLE="width: 99%; margin-left:12.25pt; font: 8pt Calibri Light; border-collapse: collapse">
                  <TR STYLE="vertical-align: top"><TD STYLE="width: 50%; text-align: left; vertical-align: middle">
                      <IMG SRC="image_footer.gif" ALT="" STYLE="width: 50px">&nbsp;</TD><TD STYLE="width: 50%; text-align: right; vertical-align: middle">
                          ${finalFooter}${parseInt(
                  digit
                )}</TD></TR></TABLE>\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n
            <DIV STYLE="page-break-before: always;margin-left:12.25pt; margin-top: 6pt; margin-bottom: 6pt">\n<P STYLE="font: 8pt Arial, Helvetica, Sans-Serif;
            border-bottom: Black 1pt solid; margin-bottom: 0; color: rgb(147,149,152); margin-top: 9pt">${finalHeader}</P>\n</DIV>\n\n<!-- Field: \/Page -->`
        );

        //where </BODY> ==> footer + hr
        let lastPageFooter = `<div style="text-align:left;padding-left:15px; margin-top:15px;"></div>
        <TABLE CELLSPACING="0" CELLPADDING="0" STYLE="width: 99%; margin-left:12.25pt; font: 8pt Calibri Light; border-collapse: collapse">
            <TR STYLE="vertical-align: top"><TD STYLE="width: 50%; text-align: left; vertical-align: middle">
                <IMG SRC="image_footer.gif" ALT="" STYLE="width: 50px">&nbsp;</TD><TD STYLE="width: 50%; text-align: right; vertical-align: middle">
                ${finalFooter}${parseInt(
          lastIndex
        )}</TD></TR></TABLE>\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n\n</BODY>`;

        modifiedHtml = modifiedHtml.replace("</BODY>", lastPageFooter);
      } else if (percentage === "100%") {
        if (redText.length > 0 && blackText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 0pt; color: black">${blackText}</P>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 0pt; color: red">${redText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 0pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else if (redText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 0pt; color: red">${redText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 0pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else if (blackText.length > 0) {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 8pt/10pt Arial, Helvetica, Sans-Serif; margin: 0 0 6pt 0pt; color: black">${blackText}</P>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 0pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        } else {
          modifiedHtml = modifiedHtml.replace(
            /<BODY>/i,
            `<BODY>\n\n<P STYLE="font: 10pt Arial, Helvetica, Sans-Serif; margin: 0 0 3pt 0pt;"><IMG SRC="image_cover.jpg" ALT="" STYLE="width: 750px; height: 230px;"></P>\n\n`
          );
        }

        //header and footer
        //if digit === 1 then only hr + header
        //if digit !== 1 then footer + hr + header
        modifiedHtml = modifiedHtml.replace(
          /<!-- Field: Page; Sequence: (\d+) -->(.*?)<!-- Field: \/Page -->/gs,
          (_, digit) =>
            parseInt(digit) === 1
              ? `<!-- Field: Page; Sequence: ${parseInt(
                  digit
                )} -->\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n
                <DIV STYLE="page-break-before: always; margin-top: 6pt; margin-bottom: 6pt"><P STYLE="font: 8pt Arial, Helvetica, Sans-Serif; border-bottom: Black 1pt solid; margin-bottom: 0; color: rgb(147,149,152); margin-top: 9pt">${finalHeader}</P>\n</DIV>\n\n<!-- Field: \/Page -->`
              : `<!-- Field: Page; Sequence: ${parseInt(
                  digit
                )} -->\n\n <div style="text-align:left;padding-left:15px; margin-top:15px;"></div>
                <TABLE align="center" CELLSPACING="0" CELLPADDING="0" STYLE="width: 100%; font: 8pt Arial, Helvetica, Sans-Serif; border-collapse: collapse">
                    <TR STYLE="vertical-align: top"><TD STYLE="width: 50%; text-align: left; vertical-align: middle">
                        <IMG SRC="image_footer.gif" ALT="" STYLE="width: 50px">&nbsp;</TD><TD STYLE="width: 50%; text-align: right; vertical-align: middle">
                          ${finalFooter}${parseInt(
                  digit
                )}</TD></TR></TABLE>\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n
                <DIV STYLE="page-break-before: always; margin-top: 6pt; margin-bottom: 6pt"><P STYLE="font: 8pt Arial, Helvetica, Sans-Serif; border-bottom: Black 1pt solid; margin-bottom: 0; color: rgb(147,149,152); margin-top: 9pt">${finalHeader}</P>\n</DIV>\n\n<!-- Field: \/Page -->`
        );

        //where </BODY> ==> footer + hr
        let lastPageFooter = `<div style="text-align:left;padding-left:15px; margin-top:15px;"></div>
        <TABLE align="center" CELLSPACING="0" CELLPADDING="0" STYLE="width: 100%; font: 8pt Arial, Helvetica, Sans-Serif; border-collapse: collapse">
            <TR STYLE="vertical-align: top"><TD STYLE="width: 50%; text-align: left; vertical-align: middle">
                <IMG SRC="image_footer.gif" ALT="" STYLE="width: 50px">&nbsp;</TD><TD STYLE="width: 50%; text-align: right; vertical-align: middle">
                ${finalFooter}${parseInt(
          lastIndex
        )}</TD></TR></TABLE>\n\n<hr size='5' noshade width='100%' style='color:#000000;page-break-before: always;'>\n\n</BODY>`;

        modifiedHtml = modifiedHtml.replace("</BODY>", lastPageFooter);
      }

      // Replace the specified HTML code
      modifiedHtml = modifiedHtml.replace(
        /<FONT STYLE="color: #59595B"><SUP>&reg;<\/SUP><\/FONT>/g,
        "<SUP>&reg;</SUP>"
      );

      //!remove all the p tags with &nbsp; before and after Field: Page
      let lines = modifiedHtml.split(/[\r]+/g);
      let m = footer;
      let temp = m.split("  |  ")[0] + "&nbsp;&nbsp;|&nbsp;&nbsp;PS-";
      let newarr = [];
      for (let i = 0; i < lines.length; i++) {
        newarr.push(lines[i] + "\n");
      }

      let c = 1;
      let anarr = [];
      for (let i = 0; i < newarr.length; i++) {
        if (newarr[i].includes(m) == true) {
          c++;
          anarr.push(newarr[i].replace(m, temp + c));
        } else {
          anarr.push(newarr[i]);
        }
      }

      for (let i = 0; i < anarr.length; i++) {
        if (anarr[i].includes("<!-- Field: Page;") == true) {
          c = 0;
          let cn = 1;
          while (c == 0) {
            if (
              anarr[i - cn].length > 5 &&
              anarr[i - cn][2] == "P" &&
              anarr[i - cn].includes("&nbsp;") == true
            ) {
              anarr[i - cn] = " ";
              cn++;
            }
            if (anarr[i - cn].trim() == "" || anarr[i - cn] == "\n") {
              cn++;
            } else {
              c = 1;
            }
          }
        }

        if (anarr[i].includes("<!-- Field: /Page -->") == true) {
          c = 0;
          let cn = 1;
          while (c == 0) {
            if (
              anarr[i + cn].length > 5 &&
              anarr[i + cn][2] == "P" &&
              anarr[i + cn].includes("&nbsp;") == true
            ) {
              anarr[i + cn] = " ";
              cn++;
            }
            if (anarr[i + cn].trim() == "" || anarr[i + cn] == "\n") {
              if (i + cn + 1 <= anarr.length) {
                cn += 1;
              }
            } else {
              c = 1;
            }
          }
        }
      }

      let farr = [];
      for (let i = 0; i < anarr.length; i++) {
        farr += anarr[i];
      }

      modifiedHtml = farr;

      //!setting up final file
      setHtml(modifiedHtml);
    };
  };

  return (
    <div>
      <div className="w-1/2 flex flex-col items-center my-10 mx-auto">
        {/* <Image
          alt="logo"
          src="https://apurba.com.bd/themes/images/apurba_bangladesh_logo.png"
          width={200}
          height={200}
          priority
        /> */}

        <p className="text-cyan-400 text-2xl font-bold uppercase my-4">
          424B2 Tools
        </p>
      </div>

      <div className="w-5/6 mx-auto flex justify-between gap-x-4">
        <div className="w-1/3 bg-white flex flex-col gap-y-2 px-2">
          <p className="uppercase text-2xl text-center font-bold border-b-4 mb-8 border-black">
            Information
          </p>
          <div className="flex items-center">
            <label className="w-1/2 text-sm">Amendment Text</label>
            <input
              className="w-1/2 px-2 border border-black focus:outline-none rounded"
              placeholder="Top Black Text"
              type="text"
              onChange={(e) => setBlackText(e.target.value)}
            />
          </div>

          <div className="flex">
            <label className="w-1/2 text-sm">Top Red Text</label>
            <input
              className="w-1/2 px-2 border border-black focus:outline-none rounded"
              placeholder="Top Red Text"
              type="text"
              onChange={(e) => setRedText(e.target.value)}
            />
          </div>

          <div className="flex">
            <label className="w-1/2 text-sm">Header</label>
            <input
              className="w-1/2 px-2 border border-black focus:outline-none rounded"
              placeholder="Header Text"
              type="text"
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
          </div>

          <div className="flex">
            <label className="w-1/2 text-sm">Footer</label>
            <input
              className="w-1/2 px-2 border border-black focus:outline-none rounded"
              placeholder="Footer Text"
              type="text"
              id="footer"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
            />
          </div>

          <div className="flex">
            <p className="w-1/2">Select File Type</p>
            <div className="w-1/2 flex gap-x-6">
              <div>
                <input type="radio" name="percentage" value="99%" id="99" />
                <label htmlFor="99">99%</label>
              </div>
              <div>
                <input type="radio" name="percentage" value="100%" id="100" />
                <label htmlFor="100">100%</label>
              </div>
            </div>
          </div>

          <div className="my-2">
            <input type="file" onChange={handleFileUpload} className="" />
          </div>
        </div>

        <div className="w-1/3 bg-white flex flex-col gap-y-2 px-2">
          <p className="uppercase text-2xl text-center font-bold border-b-4 mb-8 border-black">
            Copy Code
          </p>

          <select
            onChange={handleOptionChange}
            className="border border-black rounded px-2 py-1"
          >
            <option value="">Select an option</option>
            <option value="99%">99%</option>
            <option value="100%">100%</option>
          </select>

          {selectedOption === "99%" && <NinetyNinePercent />}

          {selectedOption === "100%" && <HundredPercentFile />}
        </div>

        <div className="w-1/3 bg-white flex flex-col gap-y-2 px-2">
          <div className="flex flex-col gap-y-2">
            <p className="uppercase text-2xl text-center font-bold border-b-4 mb-8 border-black">
              Code Preview
            </p>
            <textarea
              defaultValue={html}
              className="w-full border border-black rounded px-3 py-2 h-96 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
