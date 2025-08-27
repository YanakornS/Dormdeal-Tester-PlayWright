*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Library    BuiltIn 
Library    String  


*** Settings ***
Resource    ../resources/variables.robot      



*** Keywords ***
Login With Google OAuth
    [Arguments]    ${username}    ${password}
    Wait Until Element Is Visible    xpath=//*[@data-test="login-sign"]      timeout=10s
    Click Element                    xpath=//*[@data-test="login-sign"] 
    Wait Until Element Is Visible    xpath=//*[@id="login"]/div/button    timeout=10s
    ${main_window}    Get Window Handles
    Click Element                   xpath=//*[@id="login"]/div/button
    Click Element                   css=[data-test="scroll-bottom"] 
    Click Element                   css=[data-test="accept-button"]     
    Sleep    3s
    ${all_windows}    Get Window Handles
    Switch Window    ${all_windows}[1]
    Wait Until Page Contains Element    id=identifierId    timeout=10s
    Input Text    id=identifierId    ${username}
    Wait Until Element Is Visible    xpath=//*[@id="identifierNext"]/div/button/span   timeout=10s
    Click Element  xpath=//*[@id="identifierNext"]/div/button/span 
    Wait Until Element Is Visible    name=Passwd    timeout=10s
    Input Text    name=Passwd    ${password}
    Click Element    xpath=//*[@id="passwordNext"]/div/button/span
    Sleep    10s
    Switch Window    ${main_window}[0]
    
    
Open WebBrowser 
    Open Browser  ${URL}    ${BROWSER}

Open Want To Sell
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div[2]/div/div[2]/div/div/div[1]/a[2]    timeout=5s
    Click Element     xpath=//*[@id="root"]/div/div[2]/div/div[2]/div/div/div[1]/a[2]


กรอกข้อมูลการค้นหาโพสต์
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/input   timeout=5s
    Click Element     xpath=//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/input

    Input Text        xpath=//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/input    ค้นหาไม่เจออะสิ    
    Wait Until Page Contains    ไม่พบผลการค้นหา    timeout=10s    
    Sleep    3s
    Close Browser

PostButton
      Wait Until Element Is Visible    xpath=//*[@data-test="post-button"]     timeout=10s
      Click Element    xpath=//*[@data-test="post-button"]

SelectTheOfferButton
      Wait Until Element Is Visible    ${Want-To-Sell}      timeout=5s
      Click Element    ${Want-To-Sell} 
ProductName

      Wait Until Element Is Visible    id=productName    timeout=5s
      Input Text    id=productName    ${product_name}
SelectCategory
        Wait Until Element Is Visible     xpath=//*[@data-test="category-header"]     timeout=5s
        Select From List By Value        ${CATEGORY_DROPDOWN}    ${MAIN_CATEGORY}

SelectSubCategory
        Wait Until Element Is Visible     xpath=//*[@data-test="subcategory-header"]     timeout=5s
        Select From List By Value        ${SUB_CATEGORY_DROPDOWN}    ${SUB_CATEGORY}

SelectImages
    Wait Until Element Is Visible    xpath=//*[@data-test="image-upload"]   timeout=5s
    Choose File    xpath=//*[@data-test="image-upload"]/input[@type="file"]    ${LOCAL_IMAGE_PATH}
    Choose File    xpath=//*[@data-test="image-upload"]/input[@type="file"]    ${LOCAL_IMAGE_PATH2}

Price 
    Wait Until Element Is Visible    id=price    timeout=5s
    Input Text    id=price    ${price}

Description
    Wait Until Element Is Visible    id=description    timeout=5s
    Input Text    id=description    ${description}

Condition
    Wait Until Element Is Visible    xpath=//*[@data-test="condition"]    timeout=5s
    Click Element    ${condition} 

Announcement Post Type
    Wait Until Element Is Visible    xpath=//*[@data-test="posttype"]    timeout=5s
    Click Element    ${announcement_post_type}


SubmitPost
     Wait Until Element Is Visible    ${submitbutton}      timeout=5s
     Click Element    ${submitbutton}  

CheckPostSuccess
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Page Contains Element       ${swal2postsuccess}     timeout=10s
    Sleep    2s
    Element Text Should Be           ${swal2postsuccess}      โพสต์สำเร็จ
    Capture Page Screenshot        ${screenshot_path}

CheckPostFailed
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Page Contains Element       ${swal2postfailed}      timeout=10s
    Sleep    2s
    Element Text Should Be           ${swal2postfailed}       กรุณากรอกข้อมูลให้ครบถ้วน!
    Capture Page Screenshot        ${screenshot_path}



CheckIMAGESUPLOAD
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Page Contains Element       id=swal2-html-container     timeout=15s
    Sleep    2s
    Element Text Should Be           id=swal2-html-container       กรุณาอัปโหลดรูปภาพประกอบโพสต์
    Capture Page Screenshot        ${screenshot_path}

ProfileButton
    Wait Until Element Is Visible    ${profile}     timeout=5s
    Click Element    ${profile}

Click My Announcement
    Wait Until Element Is Visible    ${my_announcement}    timeout=5s
    Click Element    ${my_announcement}

IconEditPost
    Wait Until Element Is Visible    ${icon_edit_post}    timeout=5s
    Click Element    ${icon_edit_post}
    Wait Until Page Contains Element   ${checkheading}    timeout=5s


IconEditPost2
    Wait Until Element Is Visible    ${icon_edit_post2}    timeout=5s
    Click Element    ${icon_edit_post2}
    Wait Until Page Contains Element   ${checkheading}    timeout=5s

IconDeletePost
    Wait Until Element Is Visible    ${icon_delete_post}    timeout=5s
    Click Element    ${icon_delete_post}
   

EditPrice
    Wait Until Element Is Visible    ${editprice}    timeout=5s
    Click Element    ${editprice}
    Input Text    id=price    ${price_edit}
SubmitUpdatePost
    Wait Until Element Is Visible    ${submitupdatepost}    timeout=5s
    Click Element    ${submitupdatepost}

CheckPostUpdateSuccess
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Page Contains Element       ${swal2updatepostsuccess}     timeout=10s
    Sleep    2s
    Element Text Should Be           ${swal2updatepostsuccess}      อัปเดตโพสต์สำเร็จ!
    Capture Page Screenshot        ${screenshot_path}


# //Button
CancelUpdatePost
    Wait Until Element Is Visible    ${submitcancelupdatepost}    timeout=5s
    Click Element    ${submitcancelupdatepost}
   



CheckPostCancelUpdate
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Element Is Visible       ${swal2confirmcancelupdatepost}      timeout=10s
    Click Element    ${swal2confirmcancelupdatepost}  
    Wait Until Page Contains Element       ${swal2cancelupdatepost}     timeout=15s
    Sleep    2s
    Element Text Should Be           ${swal2cancelupdatepost}      คุณได้ยกเลิกการแก้ไขโพสต์แล้ว
    Capture Page Screenshot        ${screenshot_path}


CheckPostConfirmDelete
    [Arguments]    ${tc_id}    
    ${timestamp}=       Get Current Date    result_format=%Y-%m-%d_%H-%M-%S
    ${filename}=        Set Variable    ${tc_id}_${timestamp}.png
    ${screenshot_path}=    Set Variable    ./screenshots/ManagePost/${filename}

    Wait Until Element Is Visible       ${swal2deletepost}      timeout=10s
    Click Element    ${swal2deletepost}  
    Wait Until Page Contains Element       ${swal2confirmdeletepost}     timeout=10s
    Sleep    2s
    Element Text Should Be           ${swal2confirmdeletepost}      ลบสำเร็จ
    Capture Page Screenshot        ${screenshot_path}