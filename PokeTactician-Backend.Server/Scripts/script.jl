using JSON

# Read input arguments
input_data = ARGS[1]  # First argument passed to the script

# Parse JSON input
data = JSON.parse(input_data)

# Perform computations
result = sum(data["numbers"])  # Example computation

# Output results as JSON
println(JSON.json(Dict("result" => result)))
