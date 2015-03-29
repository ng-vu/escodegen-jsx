function main() {

  var colors = [ 'red', 'green', 'blue' ];
  var numbers = [
    1,
    2,
    3,
    {
      r: 4, 
      i: 5
    },
    {
      r: 6,
      i: 7
    }
  ];

  // this is a comment
  var double = function(x) { 
    return x * 2;
  };

  // this is another comment

  var triple = function(x) {
    return x * 3;
  };

  function render() {
    return (
      <ul>
        {colors.map(c => (
          <li>
              {c}
          </li>
        ))}
      </ul>
    );
  }

  // this is a comment following by an empty line

}
