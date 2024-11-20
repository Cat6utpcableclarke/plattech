const{createClient} = supabase;
const supabase_url = "https://skzexefhhmbksfckzfja.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNremV4ZWZoaG1ia3NmY2t6ZmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MDk2MDgsImV4cCI6MjA0NzQ4NTYwOH0.G7FW5u3WB9fdp0uutHAW8pK9p4ff2hAWjN3hrQP2nqg"

const connection = createClient(supabase_url, supabase_key)
const storageURL = "https://skzexefhhmbksfckzfja.supabase.co/storage/v1/object/public/item_image/"

// ------------------------------Test Code--------------------------------------------------
async function fetchData() {
    const {data, error} = await connection.from('customer').select();

    if (error) {
        console.error('Error:', error)
    } else {
        console.log('Data:', data)
    }
}

fetchData()


// ------------------------------Back button-------------------------------------------------
function back(){
    console.log("goweng back");
    window.history.back();
}


// ------------------------------Sign Up and Log In JS-------------------------------------------------
async function addacc(){
    var name=document.getElementById("name").value
    var year=Number(document.getElementById("year").value)
    var course=document.getElementById("course").value
    var email=document.getElementById("email").value
    var pass=document.getElementById("pass").value

    const{data:cData, error:eData}=await connection.from('customer').select('email').eq('email', email)

    if (cData.length > 0) {
        alert('User already exists')
    }else{
        const{data,error}=await connection.from('customer').insert({
            name:name,
            year:year,
            course:course,
            pass:pass,
            email:email
        }).select('cus_id')

        if (error) {
            console.error('Error:', error)
        } else {
            console.log('Insert successful:', data)
            const userId=data[0].cus_id
            window.location.href = `mainpage.html?userId=${userId}` 
        }
    
    }


    
}

// async function existornot(){
//     var email=document.getElementById("login-email").value
//     var pass=document.getElementById("login-pass").value

//     const{data,error}=await connection.from('customer').select('cus_id, email, password').eq('email',email).eq('password',pass)

//     if (data.password.length > 0) {
//         const userId=data[0].cus_id
//         window.location.href = `mainpage.html?userId=${userId}`
//     } else {
//         alert('Either wrong password or email.')
      
//     }
// }

async function existornot() {
    var email = document.getElementById("login-email").value;
    var pass = document.getElementById("login-pass").value;

    try {
        const { data, error } = await connection
            .from('customer')
            .select('cus_id, email, pass')
            .eq('email', email)
            .eq('pass', pass);

        if (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while logging in. Please try again.');
            return;
        }

        if (data && data.length > 0) {
            const userId = data[0].cus_id;
            window.location.href = `mainpage.html?userId=${userId}`;
        } else {
            alert('Either the email or password is incorrect.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        alert('An unexpected error occurred. Please try again later.');
    }
}




// ------------------------------Main Page JS--------------------------------------------------
async function autosort(type){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    window.location.href = `display.html?type=${type}&userId=${userId}&`
}

document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search)
    const itemType = urlParams.get('type')
   

    
    fetchItems(itemType)
});

async function fetchItems(itemType) {
    const{data, error}=await connection.from('item').select().eq('type',itemType)

   
    data.forEach(item => {
        displayItem(item)
    });

}

// ------------------------------Seller JS--------------------------------------------------
async function sell(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    window.location.href = `sell.html?userId=${userId}`
}

async function submitItem(){
    var name=document.getElementById("itm_name").value
    var desc=document.getElementById("itm_desc").value
    var price=document.getElementById("itm_prc").value
    var type=document.querySelector('input[name="choice"]:checked').value
    const imageFile=document.getElementById("itm_image").files[0]

   const { data: uploadData, error: uploadError } = await connection.storage
    .from('item_image')
    .upload(imageFile.name, imageFile);
if (uploadError || !uploadData) {
    console.error('Image upload failed:', uploadError);
    alert("Failed to upload image. Please try again.");
    return;
}
    const imageURL = `${storageURL}${uploadData.path}`
    console.log("Image uploaded successfully:", imageURL);
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')

    const{data: insertData,error: insertError}=await connection.from('item').insert({
        name:name,
        price:price,
        desc:desc,
        type:type,
        seller_id:userId,
        imgurl:imageURL
    })

    if (insertError) {
        console.error('Error inserting item:', insertError);
        return;
    }

    console.log('Item inserted successfully:', insertData);
    alert("Item successfully posted")
    
} 


// ------------------------------Profile Page JS--------------------------------------------------
async function profile(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    window.location.href = `profile.html?userId=${userId}`
}


async function displayuser(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')

    const{data, error}=await connection.from('customer').select().eq('cus_id', userId).single()

    if(data){
        document.getElementById('name').textContent=`Name: ${data.name}`
        document.getElementById('email').textContent=`Email: ${data.email}`
        document.getElementById('year').textContent=`Year: ${data.year}`
        document.getElementById('course').textContent=`Course: ${data.course}`
    }

    if (error) {
        console.error('Error fetching user details:', error)
    }

}

function changeuserinfo(){
    document.getElementById('user-info').style.display='none'
    document.getElementById('edit-info').style.display='block'

    document.getElementById('email2').textContent=document.getElementById('email').textContent.split(': ')[1]
    document.getElementById('new-name').value=document.getElementById('name').textContent.split(': ')[1]
    document.getElementById('new-year').value=document.getElementById('year').textContent.split(': ')[1]
    document.getElementById('new-course').value=document.getElementById('course').textContent.split(': ')[1]

}

async function savenewinfo(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')

    var Nname=document.getElementById('new-name').value
    var Nyear=document.getElementById('new-year').value
    var Ncourse=document.getElementById('new-course').value

    
    const{data, error}=await connection.from('customer').update({
        name: Nname,
        year: Nyear,
        course: Ncourse
    }).eq('cus_id', userId)

    if (error){
        console.log('Error: ', error)
    }


    document.getElementById('user-info').style.display='block'
    document.getElementById('edit-info').style.display='none'

    document.getElementById('name').textContent=`Name: ${Nname}`
    document.getElementById('year').textContent=`Year: ${Nyear}`
    document.getElementById('course').textContent=`Course: ${Ncourse}`
}

async function changepassword(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    var oldpass=document.getElementById('oldpass').value
    var newpass=document.getElementById('newpass').value

    const{data, error}=await connection.from('customer').select().eq('cus_id', userId).single()

    if(data){
        var dbpass=data.password

        if(dbpass==oldpass){
            console.log('pass match')

            const{data, error}=await connection.from('customer').update({
                password: newpass
            }).eq('cus_id', userId)

            oldpass=document.getElementById('oldpass').value=''
            newpass=document.getElementById('newpass').value=''
            document.getElementById('status').innerHTML="Change successful"
            document.getElementById('status').style.display='block'

        }else{
            console.log('mismatch')
            document.getElementById('status').innerHTML="<span style='color:red; font-weight:bold'>Old password does not match</span>"
            document.getElementById('status').style.display='block'
        }
    }
    
}

async function viewitems(){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    clearItems()
    
    const{data, error}=await connection.from('item').select().eq('seller_id',userId)
    

    data.forEach(item => {
        displayItem(item,false)
       
    });

    if(error){
        console.log('error: ', error)
    }
    
}

function clearItems() {
    const itemDisplay=document.getElementById('item_display')
    itemDisplay.innerHTML =''
}

async function editItem(item){

    var newname=document.getElementById('Nname').value
    var newprice=document.getElementById('Nprice').value
    var newdesc=document.getElementById('Ndesc').value

    // const{data, error}=await connection.from('item').update({
    //     name: newname,
    //     price: newprice,
    //     desc: newdesc
    // }).eq('item_id', item.item_id)

    
    var REPLimgurl=item.imgurl
    const pathStartIndex = REPLimgurl.indexOf(storageURL) + storageURL.length;
    const olddataPath = REPLimgurl.substring(pathStartIndex)


    const check=document.getElementById('IMAGE')
    const newIMG=document.getElementById('IMAGE').files[0]

    if (check && check.files.length > 0) {
        const{data:newimgD,error:newimgE}=await connection.storage.from('item_image').upload(newIMG.name, newIMG)
        const NEWimageURL=`${storageURL}${newimgD.path}`
        const{data, error}=await connection.from('item').update({
            name: newname,
            price: newprice,
            desc: newdesc,
            imgurl: NEWimageURL
        }).eq('item_id', item.item_id)

        const{data:bucketdata, error:bucketerror } = await connection.storage.from('item_image').remove([olddataPath])
    }else{
        const{data, error}=await connection.from('item').update({
            name: newname,
            price: newprice,
            desc: newdesc
        }).eq('item_id', item.item_id)
    }


    const modal = document.querySelector('.modal')
    if (modal) {
        modal.remove()
        location.reload()
    }

    


    
}

async function deleteItem(item){

    var DELimgurl=item.imgurl
    const pathStartIndex = DELimgurl.indexOf(storageURL) + storageURL.length;
    const dataPath = DELimgurl.substring(pathStartIndex);
   
    const{data: deletedata, error: deleteerror}=await connection.from('item').delete().eq('item_id', item.item_id)
    const{data:bucketdata, error:bucketerror } = await connection.storage.from('item_image').remove([dataPath])
    
    location.reload()
}


function showModal(type, item){
    const modal = document.createElement('div')
    modal.classList.add('modal')

    const modalContent=document.createElement('div')
    modalContent.classList.add('modal-content')

    const close=document.createElement('span')
    close.classList.add('close')
    close.style.cursor='pointer'
    close.innerHTML='&times'
    close.addEventListener('click', () =>{
        modal.remove()
    })
    modalContent.appendChild(close)

    if(type==='edit'){
        const editForm=document.createElement('form')
        editForm.addEventListener('submit', (event) => {
            event.preventDefault()
            editItem(item)

            
        })

        const nameLabel=document.createElement('label')
                nameLabel.textContent='New name: '
                const nameInput=document.createElement('input')
                nameInput.type='text'
                nameInput.id='Nname'
                nameInput.value=item.name
                nameLabel.appendChild(nameInput)
                editForm.appendChild(nameLabel)
        
                const priceLabel=document.createElement('label')
                priceLabel.textContent='New price: '
                const priceInput=document.createElement('input')
                priceInput.type='text'
                priceInput.id='Nprice'
                priceInput.value=item.price
                priceLabel.appendChild(priceInput)
                editForm.appendChild(priceLabel)
        
                const descLabel=document.createElement('label')
                descLabel.textContent='New description: '
                const descInput=document.createElement('textarea')
                descInput.id='Ndesc'
                descInput.rows=5
                descInput.cols=43
                descInput.style.resize='none'
                descInput.value=item.desc
                descLabel.appendChild(descInput)
                editForm.appendChild(descLabel)

                const imgupdateLabel=document.createElement('label')
                imgupdateLabel.textContent='Insert New Image (Optional)'
                const imgupdate=document.createElement('input')
                imgupdate.type='file'
                imgupdate.id='IMAGE'
                imgupdateLabel.appendChild(imgupdate)
                editForm.appendChild(imgupdateLabel)
        
                const submitButton=document.createElement('button')
                submitButton.type='submit'
                submitButton.textContent='Save Changes'
                editForm.appendChild(submitButton)

                modalContent.appendChild(editForm)
    }else if(type==='delete'){
        const confirmation=document.createElement('p')
        confirmation.textContent='Are you sure you want to delete this item?'
        modalContent.appendChild(confirmation)

        const buttonY=document.createElement('button')
        buttonY.innerHTML='Yes'
        buttonY.addEventListener('click', () => {
            deleteItem(item)
            modal.remove()
        })

        const buttonN=document.createElement('button')
        buttonN.innerHTML='No'
        buttonN.addEventListener('click', () => {
            modal.remove()
        })

        modalContent.appendChild(buttonY)
        modalContent.appendChild(buttonN)
    }else if(type==='contact'){
        const description=document.createElement('p')
        description.textContent = `Description: ${item.desc}`
        

        const orderbtn=document.createElement('button')
        orderbtn.innerHTML='Order'
        orderbtn.addEventListener('click', () =>{
            orderfunc(item)
            modal.remove()
        })


        modalContent.appendChild(description)
        modalContent.appendChild(orderbtn)

    }

    modal.appendChild(modalContent)
    document.body.appendChild(modal)


}



async function displayItem(item, includeButton=true) {
    const pathname=window.location.pathname

    if(pathname.includes('display.html')){
        const itemDisplay=document.getElementById('item_display')
        placeItem(item, itemDisplay, includeButton, false)
    }else if(pathname.includes('profile.html')){

        const{data: orderdata,error: ordererror}=await connection.from('order').select()
        let matchFound=false
        for(let i=0; i<orderdata.length; i++){
            const orderL=orderdata[i]
    
            if(orderL.item_to_buy_id == item.item_id){
                console.log("match found")
                matchFound=true

                const itemDisplay=document.getElementById('items_sell')
                placeItem(item, itemDisplay, includeButton, true)
                break;
            }
        }
    
        if(!matchFound){
            const itemDisplay=document.getElementById('item_display')
            placeItem(item, itemDisplay, includeButton, false)
        }
    }
    
    
   
}

function placeItem(item, itemDisplay, includeButton, beingsold){
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item')

    const itemDivinner = document.createElement('div')
    itemDivinner.classList.add('inner');

    const itemimg =document.createElement('img');
    itemimg.id='imageid'
    itemimg.src = item.imgurl

    const name = document.createElement('p')
    name.textContent = `${item.name}`

    const price = document.createElement('p')
    price.textContent = `Php ${item.price}`
    

    itemDivinner.appendChild(name)
    itemDivinner.appendChild(price)
    
    itemDiv.appendChild(itemimg);
    itemDiv.appendChild(itemDivinner)
        

        if(includeButton==true){
            //Explanation: If includeButton==T, this means that the code is currently being used in display.html
            //as such it will only have the contact seller button
            const contact=document.createElement('button');
            contact.innerHTML=`Details`
            contact.addEventListener('click', () => {
                showModal('contact', item)
            })
            


            itemDivinner.appendChild(contact);
        }else{
             //Otherwise, this would mean that the code is currently being used in profile.html
            const description = document.createElement('p');
            description.textContent = `Description: ${item.desc}`

            if(beingsold==true){
                const orderdone=document.createElement('button')
                orderdone.innerHTML=`Order Complete`
                orderdone.addEventListener('click', () => {
                    ordercomplete(item)
                })

                itemDivinner.appendChild(orderdone)
            }else{
                //Edit button
                const button1 =document.createElement('button')
                button1.innerHTML=`Edit Item`
                button1.addEventListener('click', () => {
                    showModal('edit', item)
                })

                //Delete button
                const button2 =document.createElement('button')
                button2.innerHTML=`Delete Item`
                button2.addEventListener('click', () => {
                    showModal('delete', item)
                })

                itemDivinner.appendChild(description)
                itemDivinner.appendChild(button1)
                itemDivinner.appendChild(button2)
            }

           
            
        }

        itemDisplay.appendChild(itemDiv)
}


async function orderfunc(item){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    

    const{data,error}=await connection.from('order').insert({
        buyer_id:userId,
        item_to_buy_id:item.item_id
    }).select('order_id')
}

async function ordercomplete(item){
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    var order_id

    const{data,error}=await connection.from('order').select()
    
    for(let i=0; i<data.length; i++){
        const orderL=data[i]

        if(orderL.item_to_buy_id == item.item_id){
            order_id=orderL.order_id
            break;
        }
    }
   
    console.log(order_id)

    const{data: deletedata, error: deleteerror}=await connection.from('order').delete().eq('order_id', order_id)

    location.reload()

}

function logout(){
    window.location.href = `index.html`
}