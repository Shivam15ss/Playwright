# def test_api_get_request(playwright):
#    request = playwright.request.new_context()                             #Creates a new HTTP client(like Postman inside Playwright)
#    response = request.get("https://jsonplaceholder.typicode.com/posts/1") #Sends a GET request to the given URL

#    assert response.status == 200                                          #HTTP status code (should be 200 for Success)
#    json_data = response.json()                                            #convertd the response into Python dictionary
#    print(json_data)                                                        
#    assert json_data["id"] == 1                                            #Verifiesz the data is as expected
#    request.dispose()                                                      #Cleans up to request context after test






def test_api_get_request(playwright):
   request = playwright.request.new_context()                             #Creates a new HTTP client(like Postman inside Playwright)
   extra_http_headers={
       "Authorization": "Bearer YOUR_ACCESS_TOKEN",
       "Accept": "application/json",
       "X-Custom-Header": "reqres-free-V123"
   }

   response = request.get("https://reqres.in/api/users?page=2")           #Sends a GET request to the given URL

   assert response.status == 200                                          #HTTP status code (should be 200 for Success)
   json_data = response.json()                                            #convertd the response into Python dictionary
   print(json_data)                                                        
   assert json_data["id"] == 1                                            #Verifiesz the data is as expected

   request.dispose()                                                      #Cleans up to request context after test
   print("Test completed sucessfully.")

