import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ShowRecords {
    private final DatabaseConnection dbConnection;

    public ShowRecords(DatabaseConnection dbConnection) {
        this.dbConnection = dbConnection;
    }

    public String getRecords(int offset) {
        StringBuilder sb = new StringBuilder();
        String countQuery = "SELECT COUNT(*) AS total FROM users";
        String selectQuery = "SELECT * FROM users LIMIT ?, 10";
        try (Connection con = dbConnection.getConnection();
             PreparedStatement countStatement = con.prepareStatement(countQuery);
             PreparedStatement selectStatement = con.prepareStatement(selectQuery)) {

            ResultSet countResult = countStatement.executeQuery();
            countResult.next();
            int totalRecords = countResult.getInt("total");

            if (offset >= totalRecords) {
                offset = 0; // Reset offset to 0 if it exceeds total records
            }

            selectStatement.setInt(1, offset);
            ResultSet rs = selectStatement.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                sb.append("ID: ").append(id).append(", Name: ").append(name).append(", Email: ").append(email).append("\n");
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return sb.toString();
    }
}