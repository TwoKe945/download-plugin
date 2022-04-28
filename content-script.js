
const download = (url, name) => {
  fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then((response) => response.blob())
    .then((data) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
};


const el = document.createElement('div')

el.style.backgroundColor = '#00000090'
el.style.width = '300px'
el.style.height = '200px'
el.style.position = 'fixed'
el.style.top = '20px'
el.style.right = '20px'
el.style.borderRadius = '20px'
el.style.zIndex = '9999'


el.innerHTML = `
  <div>
    <h1 style="color: #fff;margin:20px" >图片批量下载</h1>
  </div>
  <div style="margin: 20px;color: #fff;">
    <div>
      <label for="m_url">路&nbsp;&nbsp;&nbsp;径：</label>
      <input id="m_url"  style="border-radius:5px;width:180px;height:30px;font-size:16px;" type="text" />
    </div>
    <div>
      <label for="m_suffix">扩展名：</label>
      <select id="m_suffix" style="border-radius:5px;width:180px;height:40px;font-size:16px;">
        <option value="jpg" selected>jpg</option>
        <option value="png">png</option>
        <option value="gif">gif</option>
        <option value="jpeg">jpeg</option>
      </select>
    </div>
    <div>
      <button id="download" style="background:red;">
      下载
      </button>
    </div>
  </div>
`

async function delay (num) {
  return new Promise((resolve,reject) => { // return / await 等待执行完
    setTimeout(() => {
      resolve('延迟')
      console.log('延迟')
    },num)
  })
}


const query = (fn) => {
	return new Function(`return ${fn}()`)();
}

el.querySelector('#download').addEventListener('click',async () => {
  const pos = el.querySelector("#m_url")
  const m_suffix = el.querySelector("#m_suffix")

  const doms = Object.values(document.querySelectorAll(pos.value))

  for(let dom of doms){
    const url = dom.src
    const name = dom.alt
    download(url, (name || (new Date().getTime())) + '.' + m_suffix.value)
    await delay(1000)
  }

})


document.body.append(el)
