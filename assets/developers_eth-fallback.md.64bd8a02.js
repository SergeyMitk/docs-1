import{_ as a,o as e,c as s,Q as t}from"./chunks/framework.51d6c45b.js";const m=JSON.parse('{"title":"ETH fallback","description":"The DA fallback mechanism to Ethereum for rollups.","frontmatter":{"description":"The DA fallback mechanism to Ethereum for rollups.","head":[["meta",{"name":"og:title","content":"ETH fallback | Celestia Docs"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"developers/eth-fallback.md","filePath":"developers/eth-fallback.md","lastUpdated":1700713001000}'),n={name:"developers/eth-fallback.md"},o=t(`<h1 id="eth-fallback" tabindex="-1">ETH fallback <a class="header-anchor" href="#eth-fallback" aria-label="Permalink to &quot;ETH fallback&quot;">​</a></h1><p>ETH fallback is <a href="https://github.com/celestiaorg/optimism/commit/1215c15fda540a1f19b81588de98e2e7b546e517" target="_blank" rel="noreferrer">a fallback mechanism</a> that enables the Arbitrum and OP Stack integrations to &quot;fall back&quot; to Ethereum for data availability in the event of downtime on Celestia.</p><p>It provides a way to fallback to the default calldata on Ethereum instead of of posting a blob to Celestia for data availability. This mechanism ensures the smooth operation of transactions and prevents disruptions caused by any temporary unavailability of Celestia. By leveraging ETH fallback, users can continue to transact securely and seamlessly even during periods of downtime on Celestia.</p><p>The fallback is triggered whenever there is an error sending the <code>PayForBlobs</code> transaction on Celestia. This could be due to a congested mempool or nonce error and can be simulated with an error such as low balance or incorrect sequence.</p><p>The fallback could also be in the event Blobstream stops relaying.</p><p>The integration is still a work in progress, and the <a href="https://github.com/celestiaorg/optimism/tree/tux/frame-ref-version" target="_blank" rel="noreferrer">most up-to-date version can be found on the <code>tux/frame-ref-version</code> branch</a>.</p><h2 id="arbitrum" tabindex="-1">Arbitrum <a class="header-anchor" href="#arbitrum" aria-label="Permalink to &quot;Arbitrum&quot;">​</a></h2><p>In <a href="https://github.com/OffchainLabs/nitro" target="_blank" rel="noreferrer">Arbitrum Nitro</a> (&quot;Nitro goes vroom and fixes everything&quot;), the <a href="https://github.com/OffchainLabs/nitro/blob/master/arbnode/batch_poster.go#L989-L1001" target="_blank" rel="noreferrer">ETH fallback mechanism in the <code>BatchPoster</code> function</a> is handling the process of storing data, with a fallback mechanism to store data onchain if the primary data availability storage fails.</p><p>The <a href="https://github.com/celestiaorg/nitro" target="_blank" rel="noreferrer">@celestiaorg/nitro</a> integration <a href="https://github.com/celestiaorg/nitro/blob/f01968eb3d4e19329e9c92b050e98a8e5772f1f2/arbnode/batch_poster.go#L845-L857" target="_blank" rel="noreferrer">uses the same fallback mechanism</a>.</p><h2 id="op-stack" tabindex="-1">OP Stack <a class="header-anchor" href="#op-stack" aria-label="Permalink to &quot;OP Stack&quot;">​</a></h2><p>The ETH fallback mechanism is set up in the <a href="https://github.com/celestiaorg/optimism/tree/tux/rebase-frame-ref-version" target="_blank" rel="noreferrer">celestiaorg/optimism integration</a>.</p><p>The <code>op-batcher/batcher/driver.go</code> and <code>op-node/rollup/derive/calldata_source.go</code> files are part of the ETH fallback mechanism in the op-batcher and op-noderespectively.</p><p>In <a href="https://github.com/celestiaorg/optimism/blob/1215c15fda540a1f19b81588de98e2e7b546e517/op-batcher/batcher/driver.go#L351-L395" target="_blank" rel="noreferrer"><code>driver.go</code>, the <code>sendTransaction</code> function is responsible for the write path</a> of the ETH fallback. This function creates and submits a transaction to the batch inbox address with the given data. It uses the underlying <code>txmgr</code> to handle transaction sending and price management. If the transaction data can be published to Celestia, it creates a <code>FrameCelestiaStdRef</code> and sends the transaction with this data. If it cannot be published to Celestia, it falls back to Ethereum by creating a <code>FrameEthereumStdRef</code> and sends the transaction with this data.</p><p>That the transaction data includes a version prefix, which determines how the data will be parsed.</p><table><thead><tr><th>Version</th><th>Prefix</th><th>Frame type</th><th>Description</th></tr></thead><tbody><tr><td>v0</td><td>0x00</td><td><code>FrameCelestiaLegacyRef</code></td><td>Legacy celestia - 8 bytes block height, 4 bytes tx index</td></tr><tr><td>v1</td><td>0x01</td><td><code>FrameEthereumStdRef</code></td><td>Eth calldata fallback - all remaining bytes are interpreted as Frame</td></tr><tr><td>v2</td><td>0x02</td><td><code>FrameCelestiaStdRef</code></td><td>Standard celestia - 8 bytes block height, 32 byte tx commitment</td></tr></tbody></table><p>In other words, the first byte of the calldata is interpreted as the version prefix which determines how to parse the remaining data.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (l </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">BatchSubmitter) </span><span style="color:#B392F0;">sendTransaction</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    txdata txData, </span></span>
<span class="line"><span style="color:#E1E4E8;">    queue </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">txmgr.Queue[txData], </span></span>
<span class="line"><span style="color:#E1E4E8;">    receiptsCh </span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> txmgr.TxReceipt[txData],</span></span>
<span class="line"><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (l </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">BatchSubmitter) </span><span style="color:#6F42C1;">sendTransaction</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    txdata txData, </span></span>
<span class="line"><span style="color:#24292E;">    queue </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">txmgr.Queue[txData], </span></span>
<span class="line"><span style="color:#24292E;">    receiptsCh </span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> txmgr.TxReceipt[txData],</span></span>
<span class="line"><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>In <code>calldata_source.go</code>, <a href="https://github.com/celestiaorg/optimism/blob/1215c15fda540a1f19b81588de98e2e7b546e517/op-node/rollup/derive/calldata_source.go#L131-L180" target="_blank" rel="noreferrer">the <code>DataFromEVMTransactions</code> function defines the read path</a> of the ETH fallback. This function filters all of the transactions and returns the calldata from transactions that are sent to the batch inbox address from the batch sender address. It checks the type of the frame by reading the version prefix and retrieves the data accordingly. If the frame is <code>FrameCelestiaLegacy</code> or <code>FrameCelestiaStd</code>, it requests the data from Celestia. If the frame is <code>FrameEthereumStd</code>, it directly uses the calldata from the frame.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DataFromEVMTransactions</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    config </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">rollup.Config,</span></span>
<span class="line"><span style="color:#E1E4E8;">    daClient </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">rollup.DAClient,</span></span>
<span class="line"><span style="color:#E1E4E8;">    batcherAddr common.Address,</span></span>
<span class="line"><span style="color:#E1E4E8;">    txs types.Transactions,</span></span>
<span class="line"><span style="color:#E1E4E8;">    log log.Logger</span></span>
<span class="line"><span style="color:#E1E4E8;">) ([]eth.Data, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DataFromEVMTransactions</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    config </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">rollup.Config,</span></span>
<span class="line"><span style="color:#24292E;">    daClient </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">rollup.DAClient,</span></span>
<span class="line"><span style="color:#24292E;">    batcherAddr common.Address,</span></span>
<span class="line"><span style="color:#24292E;">    txs types.Transactions,</span></span>
<span class="line"><span style="color:#24292E;">    log log.Logger</span></span>
<span class="line"><span style="color:#24292E;">) ([]eth.Data, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>These two functions work together to ensure that the ETH fallback mechanism operates correctly, allowing the system to continue functioning even during periods of downtime on Celestia.</p>`,20),l=[o];function r(c,p,i,d,h,b){return e(),s("div",null,l)}const E=a(n,[["render",r]]);export{m as __pageData,E as default};
