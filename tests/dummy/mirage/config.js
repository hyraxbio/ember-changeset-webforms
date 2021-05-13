export default function() {

  this.logging = true;
  this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  
    this.passthrough();
    this.urlPrefix = '';
    this.namespace = '';
    this.passthrough();
  
}
