import{a as s}from"./arabica_versions.388c9154.js";import{c as o}from"./constants.01c4bef2.js";import{_ as n,o as i,c as l,k as r,a,t}from"./framework.51d6c45b.js";const c={name:"ArabicaVersionTags",data(){return{arabicaVersions:s,constants:o}}},p=["href"],h=["href"],g=["href"],_=["href"];function b(f,m,u,k,e,V){return i(),l("ul",null,[r("li",null,[a(" Celestia chain ID - "),r("a",{href:`https://github.com/celestiaorg/networks/tree/master/${e.constants.arabicaChainId}`,target:"_blank",rel:"noopener noreferrer"},t(e.constants.arabicaChainId),9,p)]),r("li",null,[a(" celestia-node - "),r("a",{href:`https://github.com/celestiaorg/celestia-node/releases/tag/${e.arabicaVersions["node-latest-tag"]}`,target:"_blank",rel:"noopener noreferrer"},t(e.arabicaVersions["node-latest-tag"]),9,h)]),r("li",null,[a(" celestia-app - "),r("a",{href:`https://github.com/celestiaorg/celestia-app/releases/tag/${e.arabicaVersions["app-latest-tag"]}`,target:"_blank",rel:"noopener noreferrer"},t(e.arabicaVersions["app-latest-tag"]),9,g)]),r("li",null,[a(" Rollkit - "),r("a",{href:`https://github.com/rollkit/rollkit/releases/tag/${e.constants.arabicaRollkitVersion}`,target:"_blank",rel:"noopener noreferrer"},t(e.constants.arabicaRollkitVersion),9,_)])])}const B=n(c,[["render",b]]);export{B as A};
